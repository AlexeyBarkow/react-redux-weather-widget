import React from 'react';
import { render } from 'enzyme';
import Button from '../../app/components/Button';

describe('<Button />', () => {
    it('should render simple a link if href="^#" is provied', () => {
        const wrapper = render(<Button href="#">text</Button>);
        expect(wrapper.find('a')).toHaveLength(1);
    });
});
