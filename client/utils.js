import {MessageComponent} from './app'

export const openMessage = (propsData = {
    title: '',
    message: '',
    type: '',
    direction: 'right',
    duration: 1500,
    container: '.messages'
}) => {
    return new MessageComponent({
        el: document.createElement('div'),
        propsData
    })
};