import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import EditableTextField from './EditableTextField';
import {initialContact as contact} from '../models/contact';
import {assign} from '../assign';

function setup(propOverrides: any) {
  const props = assign({
    onSave: jasmine.createSpy('onSave'),
    name: 'name',
    text: contact.name,
    placeholder: 'Name',
    editing: true,
  }, propOverrides);

  const renderer = TestUtils.createRenderer();

  renderer.render(
    <EditableTextField {...props}/>
  );

  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('components', () => {
  describe('EditableTextField', () => {
    describe('editing', () => {
      it('should render correctly', () => {
        const {output, props} = setup({});
        expect(output.props.children.props.placeholder).toEqual(props.placeholder);
        expect(output.props.children.props.value).toEqual(props.text);
        expect(output.props.children.type).toEqual('input');
        // todo: move edit class to parent span
        expect(output.props.children.props.className).toEqual('edit');
      });

      it('should update value on change', () => {
        const {output, renderer} = setup({});
        //noinspection TypeScriptValidateJSTypes
        output.props.children.props.onChange({target: {value: 'Updated Name'}});
        const updated = renderer.getRenderOutput();
        expect(updated.props.children.props.value).toEqual('Updated Name');
      });

      it('should call onSave on return key press', () => {
        const {output, props} = setup({});
        //noinspection TypeScriptValidateJSTypes
        output.props.children.props.onKeyDown({which: 13, target: {value: 'Updated Name'}});
        expect(props.onSave).toHaveBeenCalledWith( {text: 'Updated Name', name: props.name} );
      });

      it('should switch field editing on return key press', () => {
        const {output, renderer} = setup({});
        //noinspection TypeScriptValidateJSTypes
        output.props.children.props.onKeyDown({which: 13, target: {value: 'Updated Name'}});
        const updated = renderer.getRenderOutput();
        expect(updated.props.children).toBe('Updated Name');
      });

      it('should not switch editing on blur', () => {
        const {output, renderer} = setup({});
        //noinspection TypeScriptValidateJSTypes
        output.props.children.props.onBlur({target: {value: 'Updated Name'}});
        const updated = renderer.getRenderOutput();
        expect(updated.props.editing).toBeFalsy();
      });
    });

    describe('not editing', () => {
      it('should render correctly', () => {
        const {output} = setup({editing: false});
        expect(output.props.children).toEqual(contact.name);
      });

      it('should became editable on click', () => {
        const {output, renderer} = setup({editing: false});
        output.props.onClick({});
        const updated = renderer.getRenderOutput();
        expect(updated.props.children.type).toEqual('input');
        expect(updated.props.children.props.value).toEqual(contact.name);
      });

      it('should disable editing on return key press', () => {
        const {output, renderer} = setup({editing: false});
        output.props.onClick({});
        const updated = renderer.getRenderOutput();
        //noinspection TypeScriptValidateJSTypes
        updated.props.children.props.onKeyDown({which: 13, target: {value: ''}});
        const updated = renderer.getRenderOutput();
        expect(updated.props.children.type).not.toEqual('input');
      });

      it('should hide on return key press if empty', () => {
        const {output, renderer} = setup({editing: false});
        output.props.onClick({});
        const updated = renderer.getRenderOutput();
        //noinspection TypeScriptValidateJSTypes
        updated.props.children.props.onKeyDown({which: 13, target: {value: ''}});
        const updated = renderer.getRenderOutput();
        expect(updated.props.children).toEqual('');
      });

      it('should call onSave on blur', () => {
        const {output, props, renderer} = setup({editing: false});
        output.props.onClick({});
        const updated = renderer.getRenderOutput();
        //noinspection TypeScriptValidateJSTypes
        updated.props.children.props.onBlur({target: {value: 'Updated Name'}});
        const updated = renderer.getRenderOutput();
        expect(props.onSave).toHaveBeenCalledWith( {text: 'Updated Name', name: props.name} );
      });

      it('should disable editing on blur', () => {
        const {output, renderer} = setup({editing: false});
        output.props.onClick({});
        const updated = renderer.getRenderOutput();
        //noinspection TypeScriptValidateJSTypes
        updated.props.children.props.onBlur({target: {value: 'Updated Name'}});
        const updated = renderer.getRenderOutput();
        expect(updated.props.children).toBe('Updated Name');
      });
    });
  });
});
