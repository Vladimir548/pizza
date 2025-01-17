import axios, { CreateAxiosDefaults } from 'axios'

import { getAccessToken } from '@/app/api/auth/auth.helper'
import { getContentType, getContentTypeData } from './api.helper'

const API_URL = 'http://localhost:5000/api'
const axiosOptions: CreateAxiosDefaults = {
	baseURL: API_URL,
	headers: getContentType(),
	withCredentials: true,
}
const axiosOptionsData: CreateAxiosDefaults = {
	baseURL: API_URL,
	headers: getContentTypeData(),
	withCredentials: true,
}
export const axiosClassic = axios.create(axiosOptions)
export const axiosData = axios.create(axiosOptionsData)
axiosClassic.interceptors.request.use(config => {
	const accessToken = getAccessToken()
	if (config?.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}
	return config
})
// axiosClassic.interceptors.response.use(
// 	config => {
// 		return config
// 	},

// 	async error => {
// 		const originalRequest = error.config

// 		if (
// 			error?.response?.status === 401 ||
// 			(error.config && !error.config._isRetry)
// 		) {
// 			originalRequest._isRetry = true
// 			try {
// 				await authService.getNewTokens()
// 				return axiosClassic.request(originalRequest)
// 			} catch (error) {
// 				if (errorCatch(error) === 'jwt expired') removeFromStorage()
// 			}
// 		}
// 		throw error
// 	}
// )
