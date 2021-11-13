import { render, cleanup, queryByAttribute } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import config from '../../constant/config';
import Contact from '../Contact';

afterEach(() => {
  cleanup();
});

test('check that the about element gets rendered', () => {
  const spy = jest.fn();
  const { container } = render(<Contact onClose={spy} />);
  const getById = queryByAttribute.bind(null, 'id');
  const footerElement = getById(container, 'contact');
  expect(footerElement).toBeInTheDocument();
});

test('check that the onClose prop is called on close button press', () => {
  const spy = jest.fn();
  const { container } = render(<Contact onClose={spy} />);
  const getById = queryByAttribute.bind(null, 'id');
  const closeButton = getById(container, 'closeButton');
  userEvent.click(closeButton);
  expect(spy).toHaveBeenCalled();
});

test('check first name field needs minimum character count', () => {
  const onCloseSpy = jest.fn();
  const callbackSpy = jest.fn();
  const { container } = render(<Contact onClose={onCloseSpy} customCallback={callbackSpy} />);
  const getById = queryByAttribute.bind(null, 'id');
  const textbox = getById(container, 'firstname');
  const errorMessage = getById(container, 'firstnameError');
  const submitButton = getById(container, 'submit');
  userEvent.click(submitButton);
  expect(errorMessage.textContent).toBeTruthy();
  userEvent.type(textbox, 'John');
  expect(errorMessage.textContent).toBeFalsy();
  textbox.setSelectionRange(0,99);
  userEvent.type(textbox, 'J');
  expect(errorMessage.textContent).toBeTruthy();
});

test('check surname field needs minimum character count', () => {
  const onCloseSpy = jest.fn();
  const callbackSpy = jest.fn();
  const { container } = render(<Contact onClose={onCloseSpy} customCallback={callbackSpy} />);
  const getById = queryByAttribute.bind(null, 'id');
  const textbox = getById(container, 'surname');
  const errorMessage = getById(container, 'surnameError');
  const submitButton = getById(container, 'submit');
  userEvent.click(submitButton);
  expect(errorMessage.textContent).toBeTruthy();
  userEvent.type(textbox, 'Smith');
  expect(errorMessage.textContent).toBeFalsy();
  textbox.setSelectionRange(0,99);
  userEvent.type(textbox, 'S');
  expect(errorMessage.textContent).toBeTruthy();
});

test('check email field requires a valid email format', () => {
  const onCloseSpy = jest.fn();
  const callbackSpy = jest.fn();
  const { container } = render(<Contact onClose={onCloseSpy} customCallback={callbackSpy} />);
  const getById = queryByAttribute.bind(null, 'id');
  const textbox = getById(container, 'email');
  const errorMessage = getById(container, 'emailError');
  const submitButton = getById(container, 'submit');
  userEvent.click(submitButton);
  expect(errorMessage.textContent).toBeTruthy();
  userEvent.type(textbox, 'JohnSmith');
  expect(errorMessage.textContent).toBeTruthy();
  textbox.setSelectionRange(0,99);
  userEvent.type(textbox, 'JohnSmithemail');
  expect(errorMessage.textContent).toBeTruthy();
  textbox.setSelectionRange(0,99);
  userEvent.type(textbox, 'JohnSmith@.com');
  expect(errorMessage.textContent).toBeTruthy();
  textbox.setSelectionRange(0,99);
  userEvent.type(textbox, 'JohnSmith@email.com');
  expect(errorMessage.textContent).toBeFalsy();
});

test('check message field needs minimum character count', () => {
  const onCloseSpy = jest.fn();
  const callbackSpy = jest.fn();
  const { container } = render(<Contact onClose={onCloseSpy} customCallback={callbackSpy} />);
  const getById = queryByAttribute.bind(null, 'id');
  const textbox = getById(container, 'content');
  const errorMessage = getById(container, 'contentError');
  const submitButton = getById(container, 'submit');
  userEvent.click(submitButton);
  expect(errorMessage.textContent).toBeTruthy();
  userEvent.type(textbox, 'Hello!');
  expect(errorMessage.textContent).toBeTruthy();
  textbox.setSelectionRange(0,99);
  userEvent.type(textbox, 'Hello eve');
  expect(errorMessage.textContent).toBeTruthy();
  textbox.setSelectionRange(0,99);
  userEvent.type(textbox, 'Hello everyone!');
  expect(errorMessage.textContent).toBeFalsy();
});

test('check that the form is submitted if all valid', () => {
  const onCloseSpy = jest.fn();
  const callbackSpy = jest.fn();
  const { container } = render(<Contact onClose={onCloseSpy} customCallback={callbackSpy} />);
  const getById = queryByAttribute.bind(null, 'id');
  const firstnameInput = getById(container, 'firstname');
  const surnameInput = getById(container, 'surname');
  const emailInput = getById(container, 'email');
  const contentInput = getById(container, 'content');
  const submitButton = getById(container, 'submit');
  const status = getById(container, 'status');
  userEvent.type(firstnameInput, 'John');
  userEvent.type(surnameInput, 'Smith');
  userEvent.type(emailInput, 'johnsmith@email.com');
  userEvent.type(contentInput, 'Hello everyone!');
  userEvent.click(submitButton);
  expect(status.textContent).toBe(config.contactFormSuccess);
  expect(callbackSpy).toHaveBeenCalled();
});

test('check that the form is not submitted invalid', () => {
  const onCloseSpy = jest.fn();
  const callbackSpy = jest.fn();
  const { container } = render(<Contact onClose={onCloseSpy} customCallback={callbackSpy} />);
  const getById = queryByAttribute.bind(null, 'id');
  const firstnameInput = getById(container, 'firstname');
  const submitButton = getById(container, 'submit');
  const status = getById(container, 'status');
  userEvent.type(firstnameInput, 'John');
  userEvent.click(submitButton);
  expect(status.textContent).toBe(config.contactFormError);
  expect(callbackSpy).not.toHaveBeenCalled();
});
