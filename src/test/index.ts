/* tslint:disable:max-line-length */

import { JsonSchema } from '../dependencies/json-schema';
import { GuiModelMapper } from '../lib/gui-model.mapper';
import { GuiModel, TypedField } from '../lib/gui-model';

import { simple_schema1, simple_schema2, complex_schema1,
         test_different_elements_schema1, test_groups_schema1,
         invalid_schema1 } from './schemas';

import { simple_gui_model1 as expected_simple_gui_model1,
         simple_gui_model2 as expected_simple_gui_model2,
         test_different_elements_gui_model1 as expected_test_elements_schema1,
         test_groups_gui_model1 as expected_test_groups_gui_model1,
         complex_gui_model1 as expected_complex_gui_model1,
         invalid_gui_model1 as expected_invalid_gui_model1
       } from './gui-models';

import { EMPTY_GUI_MODEL } from '../lib/constants';

import { maxGuiElementDepth } from '../lib/util';

import { deeplyStripUndefined } from './test-util';
import { expect } from 'chai';

describe('Service: GuiModelMapper', () => {
  let mapper: GuiModelMapper = new GuiModelMapper();

  function map(schema: JsonSchema): GuiModel {
    return deeplyStripUndefined(mapper.mapToGuiModel(schema));
  }

  it('should map simple model 1 correctly', () => {
    let guiModel = map(simple_schema1);
    expect(guiModel).to.deep.equal(expected_simple_gui_model1);
  });

  it('should map simple model 2 correctly', () => {
    let guiModel = map(simple_schema2);
    expect(guiModel).to.deep.equal(expected_simple_gui_model2);
  });

  it('should map different elements test schema 1 correctly', () => {
    let guiModel = map(test_different_elements_schema1);
    expect(guiModel).to.deep.equal(expected_test_elements_schema1);
  });

  it('should map group test model 1 correctly', () => {
    let guiModel = map(test_groups_schema1);
    expect(guiModel).to.deep.equal(expected_test_groups_gui_model1);
  });

  it('should map complex model 1 correctly', () => {
    let guiModel = map(complex_schema1);
    expect(guiModel).to.deep.equal(expected_complex_gui_model1);
  });

  it('should report error(s)', () => {
    let guiModel = map(invalid_schema1 as JsonSchema);
    expect(guiModel.errors.length).to.be.greaterThan(0);
    expect(guiModel).to.deep.equal(expected_invalid_gui_model1);
  });
});

describe('Utils', () => {
 it('should calculate maxDepth of empty model correctly', () => {
    let depth = maxGuiElementDepth(EMPTY_GUI_MODEL);
    expect(depth).to.equal(1);
  });

  it('should calculate maxDepth of field correctly', () => {
    let field: TypedField<string> = {
        kind: 'field',
        name: '',
        controlType: 'input',
        label: '',
        tooltip: '',
        dataObjectPath: '',
        defaultValue: '',
        values: [],
        required: true,
        type: 'string',
        subType: 'text'
    };

    let depth = maxGuiElementDepth(field);
    expect(depth).to.equal(1);
  });

  it('should calculate maxDepth of complex example correctly', () => {
    let depth = maxGuiElementDepth(expected_complex_gui_model1);
    expect(depth).to.equal(3);
  });
});

