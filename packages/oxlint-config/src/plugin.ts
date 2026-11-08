import { definePlugin, defineRule } from '@oxlint/plugins'
import type { Plugin } from '@oxlint/plugins'

const typeParameterPattern = /^(T|T[A-Z][A-Za-z]+)$/

/**
 * Replaces the `typeParameter` selector of `@typescript-eslint/naming-convention`
 * from `@tanstack/eslint-config`, which Oxlint does not implement.
 */
const typeParameterNaming = defineRule({
  meta: {
    type: 'suggestion',
    docs: {
      description: `Require type parameter names to match ${typeParameterPattern}`,
    },
    messages: {
      invalid: 'Type parameter `{{name}}` must match {{pattern}}.',
    },
    schema: [],
  },
  create: (context) => ({
    TSTypeParameter(node) {
      // Matches `@typescript-eslint/naming-convention`, which skips `infer` declarations
      if (node.parent.type === 'TSInferType') return
      if (!typeParameterPattern.test(node.name.name)) {
        context.report({
          node,
          messageId: 'invalid',
          data: {
            name: node.name.name,
            pattern: String(typeParameterPattern),
          },
        })
      }
    },
  }),
})

/**
 * Custom rules used by `@tanstack/oxlint-config`, loaded as the `tanstack` JS plugin.
 */
const plugin: Plugin = definePlugin({
  meta: { name: 'tanstack' },
  rules: {
    'type-parameter-naming': typeParameterNaming,
  },
})

export default plugin
