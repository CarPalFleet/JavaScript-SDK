import {camelToSnake} from '../utility/ChangeCase';

// REVIEW What is the utility of this ? you are just passing params and not doing anything
export const snakeCaseDecorator = (params) => camelToSnake(params);
