export const createQueuePromise = jest.fn().mockReturnValue(Promise.resolve(true));
const createQueueFunc = jest.fn().mockImplementation(() => ({ promise: createQueuePromise }));

export const listQueuesPromise = jest.fn().mockReturnValue(Promise.resolve(true));
const listQueuesFunc = jest.fn().mockImplementation(() => ({ promise: listQueuesPromise }));

export const getQueueUrlPromise = jest.fn().mockReturnValue(Promise.resolve(true));
const getQueueUrlFunc = jest.fn().mockImplementation(() => ({ promise: getQueueUrlPromise }));

export const sendMessagePromise = jest.fn().mockReturnValue(Promise.resolve(true));
const sendMessageFunc = jest.fn().mockImplementation(() => ({ promise: sendMessagePromise }));

export const SQS = {
  createQueue: createQueueFunc,
  listQueues: listQueuesFunc,
  getQueueUrl: getQueueUrlFunc,
  sendMessage: sendMessageFunc,
};
