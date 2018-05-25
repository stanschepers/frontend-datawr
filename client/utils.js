import {MessageComponent} from './app'

export const openMessage = (propsData = {
    title: '',
    message: '',
    type: '',
    direction: 'right',
    duration: 3000,
    container: '.messages'
}) => {
    return new MessageComponent({
        el: document.createElement('div'),
        propsData
    })
};