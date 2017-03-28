import React from 'react';
import { shallow } from 'enzyme';
import times from 'lodash/times';
import PaginationContainer from '../../app/containers/PaginationContainer';

describe('PaginationContainer', () => {
    describe('#componentWillReceiveProps', () => {
        it('should change items count when it\'s been changed', () => {
            const wrapper = shallow(<PaginationContainer pageSize={10} />);
            wrapper.setProps({
                children: times(15, i => <div key={i}>{ i }</div>),
            });
            expect(wrapper.state('itemsCount')).toEqual(15);
        });
        it('should set current page to 0 when page size is changed', () => {
            const wrapper = shallow(<PaginationContainer pageSize={10} />);
            wrapper.setProps({
                pageSize: 5,
            });
            expect(wrapper.state('currPage')).toEqual(0);
        });
    });
});
