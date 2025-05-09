import { Body, Head, Heading, Link, Preview, Section, Tailwind, Text } from '@react-email/components'
import { Html } from '@react-email/html'
import * as React from 'react'

interface DeactivateTemplateProps {
	token: string
}

export function DeactivateTemplate({ token }: DeactivateTemplateProps) {
	return (
		<Html>
			<Head />
			<Preview>Account deactivation</Preview>
			<Tailwind>
				<Body className='max-w-2xl mx-auto p-6 bg-slate-50'>
					<Section className='text-center mb-8'>
						<Heading className='text-3xl text-black font-bold'>
						Request to deactivate an account
						</Heading>
						<Text className="text-black text-base mt-2">
						You have initiated the process of deactivating your account on the platform <b>MedAir</b>.
						</Text>
					</Section>

					<Section className='bg-gray-100 rounded-lg p-6 text-center mb-6'>
						<Heading className='text-2xl text-black font-semibold'>
						Verification code:
						</Heading>
						<Heading className='text-3xl text-black font-semibold'>
							{token}
						</Heading>
						<Text className='text-black'>
						This code is valid for 5 minutes.
						</Text>
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
