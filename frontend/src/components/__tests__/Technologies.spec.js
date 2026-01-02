import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Technologies from '../Technologies.vue'

describe('Technologies.vue', () => {
  it('renders the main heading', () => {
    const wrapper = mount(Technologies)
    expect(wrapper.find('h2').text()).toBe('Technologies Used')
  })
})
