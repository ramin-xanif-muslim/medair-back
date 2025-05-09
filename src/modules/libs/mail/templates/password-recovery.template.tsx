import { Body, Head, Heading, Link, Preview, Section, Tailwind, Text } from '@react-email/components'
import { Html } from '@react-email/html'
import * as React from 'react'


interface PasswordRecoveryTemplateProps {
	domain: string
	token: string
}

export function PasswordRecoveryTemplate({ domain, token }: PasswordRecoveryTemplateProps) {
	const resetLink = `${domain}/account/recovery/${token}`

	return (
		<Html>
			<Head />
			<Preview>Reset password</Preview>
			<Tailwind>
				<Body className='max-w-2xl mx-auto p-6 bg-slate-50'>
					<Section className='text-center mb-8'>
						<Heading className='text-3xl text-black font-bold'>
						Reset password
						</Heading>
						<Text className="text-black text-base mt-2">
						You have requested a password reset for your account..
						</Text>
						<Text className="text-black text-base mt-2">
						To create a new password, click the link below:
						</Text>
						<Link href={resetLink} className='inline-flex justify-center items-center rounded-full text-sm font-medium text-white bg-[#18B9AE] px-5 py-2'>
						Reset password
						</Link>
					</Section>

					<Section className='bg-gray-100 rounded-lg p-6 mb-6'>
						<Heading 
							className='text-xl font-semibold text-[#18B9AE]'
						>
							Request Information:
						</Heading>
						<Text className='text-gray-600 mt-2'>
						If you did not initiate this request, please ignore this message.
						</Text>
					</Section>

					<Section className='text-center mt-8'>
						<Text className='text-gray-600'>
						If you have any questions or encounter any difficulties, please do not hesitate to contact our support team at{' '}
							<Link 
								href="mailto:help.medair@gmail.com" 
								className="text-[#18b9ae] underline"
							>
								help.medair@gmail.com
							</Link>.
						</Text>
					</Section>
				</Body>
			</Tailwind>
		</Html>
	)
}
