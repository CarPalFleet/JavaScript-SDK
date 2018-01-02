import snakeCase from 'snakeCase';

function snakeCaseDecorator(data) {
  return function () {
    return snakeCase(data);
  }
}

const wrapped = snakeCaseDecorator(doSomething);

function doSomething(name) {
  console.log('Hello, ' + name);
}

function loggingDecorator(wrapped) {
  return function() {
    console.log('Starting');
    const result = wrapped.apply(this, arguments);
    console.log('Finished');
    return result;
  }
}

const wrapped = loggingDecorator(doSomething);
