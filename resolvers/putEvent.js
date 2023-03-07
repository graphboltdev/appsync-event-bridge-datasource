import { util } from '@aws-appsync/utils';

export function request(ctx) {
  if (!ctx.stash.event) {
    util.error('InternalError');
  }

  return {
    operation: 'PutEvents',
    events: [
      {
        source: 'blog-appsync-api',
        ...ctx.stash.event,
      },
    ],
  };
}

export function response(ctx) {
  if (ctx.error) {
    util.error('Failed putting event in eventBride', 'Error');
  }

  return ctx.prev.result;
}
