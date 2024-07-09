import dynamodb from "../dynamodb.js";
import nanoid from 'nano-id';
import {APIError404} from "../errors.js";

export const createUser = async ({name}) => {
  const time_now = new Date();

  const user_item = {
    id: nanoid(10),
    name,
    created_at: time_now.toISOString(),
  }

  await dynamodb.put({
    TableName: 'UsersTable',
    Item: user_item
  }).promise();

  return {
    _http_code: 201,
    ...user_item
  }
}

export const getUser = async ({ id }) => {
  const user = await dynamodb.get({
    TableName: 'UsersTable',
    Key: { id }
  }).promise();

  if (!user.Item) {
    throw new APIError404('User not found');
  }

  return {
    user: user.Item
  }
}