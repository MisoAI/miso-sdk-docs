{%- for c in workflow.mains -%}
  `{{ c.tag | safe }}`{%- if not loop.last -%},&nbsp;{%- endif -%}
{%- endfor -%}
