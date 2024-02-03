// import { create, test, enforce, only, warn, include, skipWhen } from 'vest';
//
// const suite = create((data = {}, currentField) => {
//   only(currentField);
//   include('confirm').when('password');
//
//   test('username', 'Username is required', () => {
//     enforce(data.username).isNotEmpty();
//   });
//   test('username', 'Username must be at least 3 characters', () => {
//     enforce(data.username).longerThan(2);
//   });
//   test.memo('username', 'Username already taken', () => doesUserExist(data.username), [data.username]);
//
//   test('password', 'Password is required', () => {
//     enforce(data.password).isNotEmpty();
//   });
//   test('password', 'Password must be at least 6 chars', () => {
//     enforce(data.password).longerThanOrEquals(6);
//   });
//   test('password', 'Password is weak. Maybe add a number?', () => {
//     warn();
//     enforce(data.password).matches(/[0-9]/);
//   });
//
//   skipWhen(!data.confirm, () => {
//     test('confirm', 'Passwords do not match', () => {
//       enforce(data.password).equals(data.confirm);
//     });
//   });
//
//   test('tos', () => {
//     enforce(data.tos).isTruthy();
//   });
// });
//
// export default suite;
//
// async function doesUserExist(username): Promise<void> {
//   // await wait(1000);
//
//   // fake taken username.
//   enforce(parseInt(btoa(username), 36) % 3).notEquals(0);
// }
