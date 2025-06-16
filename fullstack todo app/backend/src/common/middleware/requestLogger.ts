import { randomUUID } from 'node:crypto'
import type { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import pino from 'pino'
import pinoHttp from 'pino-http'

import { env } from '../utils/envConfig'

const logger = pino({
	level: env.isProduction ? 'info' : 'debug',
	transport: env.isProduction ? undefined : { target: 'pino-pretty' },
})

const getLogLevel = (status: number) => {
	if (status >= StatusCodes.INTERNAL_SERVER_ERROR) return 'error'
	if (status >= StatusCodes.BAD_REQUEST) return 'warn'
	return 'info'
}

const addRequestId = (req: Request, res: Response, next: NextFunction) => {
	const existingId = req.headers['x-request-id'] as string
	const requestId = existingId || randomUUID()

	// Set for downstream use
	req.headers['x-request-id'] = requestId
	res.setHeader('X-Request-Id', requestId)

	next()
}

const httpLogger = pinoHttp({
	logger,
	genReqId: (req) => {
		return req.headers['x-request-id'] as string
	},
	customLogLevel: (_req, res) => {
		return getLogLevel(res.statusCode)
	},
	customSuccessMessage: (req) => {
		return `${req.method} ${req.url} completed`
	},
	customErrorMessage: (_req, res) => {
		return `Request failed with status code: ${res.statusCode}`
	},
	// Only log response bodies in development
	serializers: {
		req: (req) => {
			return {
				method: req.method,
				url: req.url,
				id: req.id,
			}
		},
	},
})

const captureResponseBody = (req: Request, res: Response, next: NextFunction) => {
	if (!env.isProduction) {
		const originalSend = res.send
		res.send = function (body) {
			res.locals.responseBody = body
			return originalSend.call(this, body)
		}
	}
	next()
}

export default [addRequestId, captureResponseBody, httpLogger]
