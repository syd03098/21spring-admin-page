import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Wrap, Container, Label, FieldSet, JoinMember, Input, SubmitButton, Divider } from './index.style';

export default observer(
    (): JSX.Element => {
        const { register, handleSubmit, errors } = useForm();

        const history = useHistory();

        const onSubmit = useCallback((data) => {
            console.log(data);
        }, []);

        return (
            <Wrap>
                <Container>
                    <h2>Sign in</h2>
                    <Divider />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldSet>
                            <Label>
                                Username or Email Address
                                <span>{errors.userAddress && errors.userAddress.message}</span>
                            </Label>
                            <Input type="text" name="userAddress" ref={register({ required: 'required' })} />
                        </FieldSet>
                        <FieldSet>
                            <Label>
                                Password<span>{errors.password && errors.password.message}</span>
                            </Label>
                            <Input type="password" name="password" ref={register({ required: 'required' })} />
                        </FieldSet>
                        <SubmitButton type="submit" value="Sign In" />
                    </form>

                    <JoinMember>
                        Not a Member?
                        <button
                            type="button"
                            onClick={(): void => {
                                history.push('/');
                            }}
                        >
                            Sign up Now
                        </button>
                    </JoinMember>
                </Container>
            </Wrap>
        );
    },
);
