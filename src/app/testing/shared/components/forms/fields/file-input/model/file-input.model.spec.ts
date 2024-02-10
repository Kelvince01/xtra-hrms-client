/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import {FileInput} from '@shared/components/forms/fields/file-input';

describe('FileInput', () => {
  let model: FileInput;

  it('should have empty fileName (empty array)', () => {
    model = new FileInput([]);
    expect(model.fileNames).equal('');
  });

  it('should have empty fileName (null)', () => {
    model = new FileInput(null);
    expect(model.fileNames).equal('');
  });
});
