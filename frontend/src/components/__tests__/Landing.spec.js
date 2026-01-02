import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Landing from '../Landing.vue'

describe('Landing.vue', () => {
  it('renders the main heading', () => {
    const wrapper = mount(Landing)
    expect(wrapper.find('h1').text()).toBe('Stats-Handball')
  })
})
