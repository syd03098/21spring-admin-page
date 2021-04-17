const { addWeeks, compareAsc, format, parseISO } = require('date-fns');

const Rand = require('randexp');
const jwt = require('jsonwebtoken');
const Account = require('../../models/account');
const RefreshToken = require('../../models/refreshToken');

exports.localRegister = async (ctx) => {
    const request = ctx.request.body;

    // const schema = Joi.object().keys({
    //     username: Joi.string(),
    //     email: Joi.string(),
    //     password: Joi.string(),
    // });
    // const validation = schema.validate(request);
    // if (validation.error) {
    //     ctx.status = 400;
    // }

    // 토큰 생성
    // request.token = await generateUniqueToken();
    let account = null;
    try {
        account = await Account.localRegister(request);
    } catch (e) {
        ctx.throw(500, e);
    }

    // 토큰 생성
    // const token = jwt.sign({});
    // let token = null;
    // try {
    //     token = await account.generateToken();
    //     console.log(token);
    // } catch (e) {
    //     ctx.throw(500, e);
    // }

    // ctx.cookies.set('refreshToken', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
    ctx.body = {
        _id: account._id,
        email: account.email,
    };
};

exports.localLogin = async (ctx) => {
    const request = ctx.request.body;
    const { email, password } = request;

    // 이메일이 없거나 비밀번호가 없으면
    if (!email || !password) {
        ctx.throw(404, 'Error has Occurred. Please try again.');
    }

    // 이메일, 비밀번호 검증
    const user = await Account.findByEmail(email);
    if (!user) {
        ctx.throw(401, 'Check your account and password and try again.');
        return;
    }

    const isPasswordValid = user.validatePassword(password);
    if (!isPasswordValid) {
        ctx.throw(401, 'Check your account and password and try again.');
    }

    const newRefreshToken = {
        email: user.email,
        refreshToken: new Rand(/[a-zA-Z0-9_-]{64,64}/).gen(),
        expiration: addWeeks(new Date(), 2),
    };

    try {
        await RefreshToken.insertRefreshToken(newRefreshToken);
    } catch (e) {
        ctx.throw(400, 'failed to push refreshToken');
    }

    const token = jwt.sign(
        {
            email: user.email,
            userName: user.username,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        { expiresIn: '6h' },
    );

    ctx.cookies.set('refreshToken', newRefreshToken.refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 14 });
    ctx.body = {
        accessToken: token,
    };
};

exports.exists = async (ctx) => {
    const { key, value } = ctx.params;
    let account = null;

    try {
        account = await (key === 'email' ? Account.findByEmail(value) : Account.findByUsername(value));
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body = {
        doExist: !!account,
    };
};

exports.logout = async (ctx) => {
    const refreshToken = ctx.cookies.get('refreshToken');
    if (!refreshToken) {
        ctx.throw(400, 'no refreshToken');
    }

    await RefreshToken.deleteRefreshToken({ refreshToken });

    ctx.body = {
        status: true,
    };
};

exports.refresh = async (ctx) => {
    const refreshToken = ctx.cookies.get('refreshToken');
    if (!refreshToken) {
        ctx.throw(400, 'no cookies');
    }

    const token = await RefreshToken.getRefreshToken({ refreshToken });
    if (!token) {
        ctx.throw(400, 'no tokens found');
    }

    const { email } = token;
    const user = await Account.findByEmail(email);
    if (!user) {
        ctx.throw(500, 'user retrieving failed');
    }

    const newRefreshToken = {
        email: user.email,
        refreshToken: new Rand(/[a-zA-Z0-9_-]{64,64}/).gen(),
        expiration: addWeeks(new Date(), 2),
    };

    // 기존 refreshToken 삭제
    await RefreshToken.deleteRefreshToken({ refreshToken });

    // 새로운 refreshToken 삽입
    try {
        await RefreshToken.insertRefreshToken(newRefreshToken);
    } catch (e) {
        ctx.throw(400, 'failed to push refreshToken');
    }

    // 엑세스 토큰 -> httponly
    const accessToken = jwt.sign(
        {
            email: user.email,
            userName: user.username,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        { expiresIn: '6h' },
    );

    ctx.cookies.set('refreshToken', newRefreshToken.refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 14 });
    ctx.body = {
        accessToken,
    };
};
