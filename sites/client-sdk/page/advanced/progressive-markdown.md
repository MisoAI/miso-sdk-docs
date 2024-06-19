---
title: Progressive markdown rendering mechanism
---

In this page, we are going to explain how the SDK handles progressive markdown rendering in `ask` workflow.

## Architecture

<table class="miso-diagram">
  <tr>
    <td>
      <div class="box">
        API Response
      </div>
    </td>
    <td>
      <div style="min-width: 36px;"></div>
      <span class="line hor green"></span>
      <span class="arrow right green"></span>
      <div class="label top">markdown</div>
    </td>
    <td>
      <div class="box">
        Parser
      </div>
    </td>
    <td>
      <div style="min-width: 36px;"></div>
      <span class="line hor green"></span>
      <span class="arrow right green"></span>
      <div class="label top">HTML AST</div>
    </td>
    <td>
      <div class="box">
        Query
      </div>
    </td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td>
      <div style="min-height: 36px;"></div>
      <span class="line ver blue" style="left: 35%;"></span>
      <span class="arrow top blue" style="left: 35%;"></span>
      <div class="label left" style="left: 35%; white-space: nowrap;">cursors<br>(from, to)</div>
      <span class="line ver blue" style="left: 65%;"></span>
      <span class="arrow bottom blue" style="left: 65%;"></span>
      <div class="label right" style="left: 65%;">operations</div>
    </td>
  </tr>
  <tr>
    <td>
      <div class="box">
        Animation Frame
      </div>
    </td>
    <td>
      <div style="min-width: 36px;"></div>
      <span class="line hor blue"></span>
      <span class="arrow right blue"></span>
    </td>
    <td>
      <div class="box">
        Pacer
      </div>
    </td>
    <td>
      <div style="min-width: 36px;"></div>
      <span class="line hor blue"></span>
      <span class="arrow right blue"></span>
      <div class="label top">cursor</div>
    </td>
    <td>
      <div class="box">
        Renderer
      </div>
    </td>
    <td>
      <div style="min-width: 36px;"></div>
      <span class="line hor blue"></span>
      <span class="arrow right blue"></span>
      <div class="label top">DOM operation</div>
    </td>
    <td>
      <div class="box">
        DOM
      </div>
    </td>
  </tr>
</table>

## Components and data objects

#### API Response
* The response from Miso ask API.

#### Parser
* Converts markdown to HTML AST.
* Uses [remark](https://remark.js.org/) and [rehype](https://github.com/rehypejs/rehype) under the hood.
* See [source code](https://github.com/MisoAI/miso-client-js-sdk/blob/main/packages/progressive-markdown/src/parser.js).

#### HTML AST
* A rehype AST (abstract syntax tree) of HTML produced by the parser.

#### Query
* Keeps track of the latest HTML AST.
* Given the previous cursor and a new cursor, computes the operations to update the DOM tree from previous state to a new state.
* See [source code](https://github.com/MisoAI/miso-client-js-sdk/blob/main/packages/progressive-markdown/src/query.js).

#### Cursor
* An index number to indicate a position in the HTML AST.
* Each character in a text node has size 1.
* Each element node without children has size 1.

#### Animation frame
* The event loop acquired by calling `window.requestAnimationFrame()`.

#### Pacer
* A module to compute cursor based on the time elapsed.
* See [source code](https://github.com/MisoAI/miso-client-js-sdk/blob/main/packages/client-sdk-ui/src/layout/text/typewriter/progress.js).

#### Operation
* A set of operations to update the DOM tree, including `append`, `set`, `ascend`, `descend`.
* See [source code](https://github.com/MisoAI/miso-client-js-sdk/blob/main/packages/progressive-markdown/src/model/operation.js).

#### Renderer
* Applies the operations to the DOM tree and keeps tracks of the element at the current cursor position.
* Offers additional hooks to customize the rendering process.

#### Typewriter element
* The controller of SDK UI typewriter element, which glues all the other parts.
* See [source code](https://github.com/MisoAI/miso-client-js-sdk/tree/main/packages/client-sdk-ui/src/layout/text/typewriter/index.js).

## Data flow

#### Update markdown from API response (the green path)

1. The SDK UI workflow periodically receives the API response.
1. The parser converts the markdown to HTML AST.
1. The query keeps track of the latest HTML AST.

#### Update DOM progressively (the blue path)

1. An event loop is acquired by calling `window.requestAnimationFrame()`.
1. The pacer computes the cursor based on current timestamp.
1. The query computes the operations to update the DOM tree from the previous state to the new state, given the previous cursor and the new cursor.
1. The renderer applies the operations to the DOM tree.

## Details

There are some details additional to the main architecture that you may want to know:

* Sometimes the HTML AST results a conflict with the previous tree as the markdown content is gradually revealed. (i.e. if markdown A is a prefix of markdown B, the HTML AST of A may NOT be a subtree of tree B.). In such case we simply overwrites the entire DOM tree.
* The API response tells you whether the markdown content is finished or not. The flag is passed to `Query` for a reason to minimize tree conflicts. It is also passed to `Pacer` for a speed-up effect.
* There are different `answer_stage` in the API response for showing placeholding text like `Checking question and fetching relevant contents...`. When the `answer_stage` is changed, the cursor is reset to 0.
* If user starts another question, the current context is reset and the DOM tree is cleared.
* The SDK acquires animation frames aggresively to keep the rendering smooth.

You can find all the details in the source code mentioned above.
