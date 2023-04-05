import express from 'express';
import { RestFields } from './common';

export type ControllerResponse<T> = Promise<
  express.Response<T, Record<any, any>>
>;

export interface ControllerRequest<
  P = RestFields<string>,
  RES = any,
  REQ = any,
  Q = any
> extends express.Request<P, RES, REQ, Q> {
  [key: string]: any;
}

export type ItemsResponse<T> = { items: T[]; totalCounts: number };
