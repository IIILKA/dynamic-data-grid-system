import ErrorViewModel from './error-view-model.ts';

export default class ErrorViewModels {
  static serverUnavailable: ErrorViewModel = {
    id: 0,
    title: 'The server is unavailable',
    description: 'We are unable to reach the server at the moment. Please retry after some time'
  };
  static unknownError: ErrorViewModel = {
    id: 0,
    title: 'An error has occurred',
    description: 'Something went wrong. Please refresh the page and try again'
  };
}
