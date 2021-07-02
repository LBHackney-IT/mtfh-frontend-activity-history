import { Router, Route } from 'react-router-dom';
import React from 'react';
import fetch from 'node-fetch';
import { rest } from 'msw';
import { createMemoryHistory, MemoryHistory } from 'history';
import { render, RenderResult } from '@testing-library/react';
import { queries } from '@mtfh/common';
import { server } from './mocks';

beforeAll(() => {
    server.listen();
});

afterEach(() => {
    server.resetHandlers();
});

afterAll(() => {
    server.close();
});

interface RouteRenderConfig {
    url: string;
    path: string;
    query: keyof typeof queries;
}

export const routeRender = (
    component: JSX.Element,
    options?: Partial<RouteRenderConfig>
): [RenderResult, MemoryHistory] => {
    const config: RouteRenderConfig = {
        url: '/person/be8c805c-b1de-11eb-8529-0242ac130003',
        path: '/person/:personId',
        query: 'lg',
        ...options,
    };
    const history = createMemoryHistory();
    history.push(config.url);
    return [
        render(
            <Router history={history}>
                <Route path={config.path}>{component}</Route>
            </Router>
        ),
        history,
    ];
};

export const get = (path: string, data: unknown, code = 200): void => {
    server.use(
        rest.get(path, (req, res, ctx) => {
            return res(ctx.status(code), ctx.json(data));
        })
    );
};
