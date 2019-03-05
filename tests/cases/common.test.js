import 'testcafe';

import defaultPage from '../pages/default';
import { getForm as $ } from '../components/formator';

/* global fixture, test */

fixture('Test #1 - Empty config')
  .page(defaultPage.url('#test1'));

test('should display a "Missing props" error', async t => {
  await t.expect($('test1').failure.visible).ok();
});

fixture('Test #2 - Type definitions')
  .page(defaultPage.url('#test2'));

test('should handle standard types', async t => {
  await t.expect($('test2').field('/intValue').visible).ok();
  await t.expect($('test2').field('/numValue').visible).ok();
  await t.expect($('test2').field('/boolValue').visible).ok();
  await t.expect($('test2').field('/strValue').visible).ok();
  await t.expect($('test2').field('/arrValue').visible).ok();
  await t.expect($('test2').field('/objValue').visible).ok();
  await t.expect($('test2').field('/objValues/strValue').visible).ok();
});

fixture('Test #3 - Fixed array types')
  .page(defaultPage.url('#test3'));

test('should handle static types per item', async t => {
  await t.expect($('test3').type('integer', '/0').visible).ok();
  await t.expect($('test3').type('number', '/1').visible).ok();
  await t.expect($('test3').type('boolean', '/2').visible).ok();
  await t.expect($('test3').type('string', '/3').visible).ok();
  await t.expect($('test3').type('array', '/4').visible).ok();
  await t.expect($('test3').type('object', '/5').visible).ok();
});
