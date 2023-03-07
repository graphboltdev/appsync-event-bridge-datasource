import { util } from '@aws-appsync/utils';

export function request(ctx) {
  const item = {
    ...ctx.args.post,
    createdAt: util.time.nowISO8601(),
    updatedAt: util.time.nowISO8601(),
  };
  return {
    operation: 'PutItem',
    key: {
      id: util.dynamodb.toDynamoDB(util.autoId()),
    },
    attributeValues: util.dynamodb.toMapValues(item),
    condition: {
      expression: 'attribute_not_exists(#id)',
      expressionNames: {
        '#id': 'id',
      },
    },
  };
}

export function response(ctx) {
  ctx.stash.event = {
    detailType: 'postCreated',
    detail: ctx.result,
  };

  return ctx.result;
}
