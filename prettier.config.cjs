module.exports = {
  overrides: [
    {
      files: ["*.twig"],
      options: {
        "tabWidth": 3,
        "useTabs": true,
        "semi": false,
        "singleQuote": true,
        "twigPrintWidth": 120,

        "twigMultiTags": [
          "nav,endnav",
          "switch,case,default,endswitch",
          "ifchildren,endifchildren",
          "cache,endcache",
          "js,endjs"
        ]
      }
    }
  ],
  plugins: ["./node_modules/prettier-plugin-twig-melody", "@ianvs/prettier-plugin-sort-imports"],
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^types$",
    "^@/types/(.*)$",
    "^@/config/(.*)$",
    "^@/lib/(.*)$",
    "^@/hooks/(.*)$",
    "^@/components/ui/(.*)$",
    "^@/components/(.*)$",
    "^@/styles/(.*)$",
    "^@/app/(.*)$",
    "",
    "^[./]"
  ],
 importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true
}
