import {
	AuthButton,
	AuthPage,
	AuthRedirect,
	FormWrapper,
	Logo
} from '../../shared';
import { Input, Select } from '@jbuschke/formik-antd';
import React, { useEffect } from 'react';

import { ApolloError } from 'apollo-client';
import { AuthSchema } from 'components/auth/common';
import { Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Formik } from 'formik';
import { notification } from 'antd';

const { Item } = Form;

type Credentials = {
	course: number;
	name: string;
	email: string;
	password: string;
};

export type OnRegister = (credentials: Credentials) => void;

interface IRegisterPresentational extends FormComponentProps {
	courses: number[];
	onLoginClick: () => void;
	onRegister: OnRegister;
	error: ApolloError | undefined;
	loading?: boolean;
	success?: boolean | null;
	onLogoClick?: () => void;
}

const RegisterPresentational: React.FC<IRegisterPresentational> = ({
	courses,
	onLoginClick,
	onRegister,
	error,
	loading,
	success,
	onLogoClick
}) => {
	useEffect(() => {
		if (error) {
			notification.error({
				message: error.message,
				duration: 0
			});
		}
	}, [error]);

	useEffect(() => {
		if (success) {
			notification.success({
				message: `Đăng kí thành công! Hãy xác nhận tin nhắn của hệ thống gửi vào Email bạn đã đăng kí để sử dụng tài khoản này`,
				duration: 0
			});
		}
	}, [success]);

	return (
		<AuthPage>
			<Logo onClick={onLogoClick} />
			<FormWrapper>
				<Formik
					validationSchema={AuthSchema}
					initialValues={{
						course: '',
						name: '',
						email: '',
						password: '',
						confirmPassword: ''
					}}
					onSubmit={({ confirmPassword, course, ...credentials }) => {
						onRegister({
							course: parseInt(course),
							...credentials
						});
					}}
				>
					{({ errors, handleBlur, touched, handleSubmit }) => (
						<Form onSubmit={handleSubmit}>
							<Item
								validateStatus={
									errors.name && touched.name ? 'error' : 'success'
								}
								help={touched.name && errors.name}
							>
								<Input
									onBlur={handleBlur}
									name="name"
									placeholder="Họ và tên"
								/>
							</Item>
							<Item
								validateStatus={
									errors.email && touched.email ? 'error' : 'success'
								}
								help={touched.email && errors.email}
							>
								<Input
									onBlur={handleBlur}
									placeholder="Email"
									type="email"
									name="email"
								/>
							</Item>
							<Item
								validateStatus={
									errors.course && touched.course ? 'error' : 'success'
								}
								help={touched.course && errors.course}
							>
								<Select
									placeholder="Khóa"
									
									name="course"
									onBlur={handleBlur}
								>
									{courses.map((course, idx) => (
										<Select.Option
											style={{
												width: '100%'
											}}
											key={idx}
											value={course}
										>
											{`Khóa ${course}`}
										</Select.Option>
									))}
								</Select>
							</Item>
							<Item
								validateStatus={
									errors.password && touched.password
										? 'error'
										: 'success'
								}
								help={touched.password && errors.password}
							>
								<Input
									onBlur={handleBlur}
									name="password"
									placeholder="Mật khẩu"
									type="password"
								/>
							</Item>

							<Item
								validateStatus={
									errors.confirmPassword && touched.confirmPassword
										? 'error'
										: 'success'
								}
								help={touched.confirmPassword && errors.confirmPassword}
							>
								<Input
									onBlur={handleBlur}
									name="confirmPassword"
									placeholder="Nhập lại mật khẩu"
									type="password"
								/>
							</Item>
							<AuthButton
								loading={loading}
								type="primary"
								htmlType="submit"
							>
								Đăng kí
							</AuthButton>
							<AuthRedirect onClick={onLoginClick}>
								Đã có tài khoản, đăng nhập
							</AuthRedirect>
						</Form>
					)}
				</Formik>
			</FormWrapper>
		</AuthPage>
	);
};

export default Form.create<IRegisterPresentational>()(RegisterPresentational);
