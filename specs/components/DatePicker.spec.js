import React from 'react';
import { shallow } from 'enzyme';
import DatePicker from '../../app/components/DatePicker';

describe('DatePicker.js', () => {
    let wrapper;
    let date;
    beforeEach(() => {
        date = new Date(2017, 2, 30);
        wrapper = shallow(
            <DatePicker
              input={{}}
              onChangeHandler={jest.fn()}
              change={jest.fn()}
              datepickerArray={[]}
              startDate={date.getTime()}
              maxBackwardInterval={0}
              maxForwardInterval={5}
            />);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('#addMonth', () => {
        it('should properly increase currDate in state', () => {
            wrapper.instance().addMonth();
            expect(wrapper.state('currDate').getTime())
                .toBe((new Date(2017, 3, 30)).getTime());
        });
    });
    describe('#reduceMonth', () => {
        it('should properly decrease currDate in state', () => {
            wrapper.instance().reduceMonth();
            expect(wrapper.state('currDate').getTime())
                .toBe((new Date(2017, 1, 30)).getTime());
        });
    });

    describe('#render', () => {
        it('should not render datepicker by default', () => {
            expect(wrapper.find('.datepicker')).toHaveLength(0);
        });
        it('should render proper date table accordingly to selected month', () => {
            wrapper.setState({ hideInput: false });
            expect(wrapper.find('.day')).toHaveLength(35);
        });
        it('only days that match interval should not be disabled', () => {
            wrapper.setState({ hideInput: false });
            const filterDisabled = wrapper.find('.day').not('.disabled');
            expect(filterDisabled).toHaveLength(4);
            expect(filterDisabled.map(el =>
                el.node.props.children.props.children)).toEqual([30, 31, 1, 2]);
        });
        it('should disable proper dates in the next month', () => {
            wrapper.setState({ hideInput: false });
            wrapper.instance().addMonth();
            const filterDisabled = wrapper.find('.day').not('.disabled');
            expect(filterDisabled).toHaveLength(6);
            expect(filterDisabled.map(el =>
                el.node.props.children.props.children)).toEqual([30, 31, 1, 2, 3, 4]);
        });
        it('should disable everything when no matched days is in selected month', () => {
            wrapper.instance().addMonth();
            wrapper.instance().addMonth();

            expect(wrapper.find('.day').not('.disabled')).toHaveLength(0);
        });
    });
});
