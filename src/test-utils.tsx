import React from "react";
import { Route, Router } from "react-router-dom";

import { RenderResult, render } from "@testing-library/react";
import { MemoryHistory, createMemoryHistory } from "history";
import { rest } from "msw";
import { SWRConfig } from "swr";

import { server } from "./mocks";

import { queries } from "@mtfh/common";

beforeAll(() => {
  server.listen();
});

beforeEach(() => {
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
  options?: Partial<RouteRenderConfig>,
): [RenderResult, MemoryHistory] => {
  const config: RouteRenderConfig = {
    url: "/activities/person/be8c805c-b1de-11eb-8529-0242ac130003",
    path: "/activities/:entityType/:personId",
    query: "lg",
    ...options,
  };
  const history = createMemoryHistory();
  history.push(config.url);

  return [
    render(
      <SWRConfig
        value={{
          provider: () => new Map(),
          dedupingInterval: 0,
          errorRetryInterval: 0,
        }}
      >
        <Router history={history}>
          <Route path={config.path}>{component}</Route>
        </Router>
      </SWRConfig>,
    ),
    history,
  ];
};

export const get = (path: string, data: unknown, code = 200): void => {
  server.use(
    rest.get(path, (req, res, ctx) => {
      return res(ctx.status(code), ctx.json(data));
    }),
  );
};
