import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Stats from '../Stats.vue'

describe('Stats.vue', () => {
  it('renders the main heading', () => {
    const wrapper = mount(Stats)
    expect(wrapper.find('h2').text()).toBe('Statistics Visualization')
  })
})
