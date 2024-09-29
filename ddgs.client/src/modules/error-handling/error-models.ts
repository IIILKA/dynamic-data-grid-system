import ErrorModel from './models/error-model.ts';

export default class ErrorModels {
  static serverUnavailable: ErrorModel = {
    id: 0,
    title: 'The server is unavailable',
    description: 'We are unable to reach the server at the moment. Please retry after some time'
  };
  static unknownError: ErrorModel = {
    id: 0,
    title: 'An error has occurred',
    description: 'Something went wrong. Please refresh the page and try again'
  };
}
