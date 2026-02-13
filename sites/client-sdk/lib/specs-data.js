var data$9 = [ { title:"Clickstream",
    events:[ { value:"product_detail_page_view",
        tier:1,
        desc:"A user views a product page." },
      { value:"category_page_view",
        tier:1,
        desc:"A user views a category page for a specific \"family\" or \"group\" or products or content." },
      { value:"search",
        tier:1,
        desc:"A user submits search keywords and/or filter criteria." },
      { value:"impression",
        tier:2,
        desc:"A product or content asset (usually from recommendation results) is rendered on the page or loaded into the client device." },
      { value:"viewable_impression",
        tier:2,
        desc:"A user saw or was presented with a product or content asset. It is usually triggered when 50% of asset area lies in the viewport for 1 second." },
      { value:"click",
        tier:2,
        desc:"A user clicks through a product link." },
      { value:"home_page_view",
        tier:2,
        desc:"A user views your home page." },
      { value:"promo_page_view",
        tier:3,
        desc:"A user views a specific promotional or curated marketing page about certain products or content." },
      { value:"product_image_view",
        tier:3,
        desc:"A user views the image of a product (e.g. to enlarge a product photo)." } ] },
  { title:"Conversion (eCommerce)",
    events:[ { value:"add_to_cart",
        tier:1,
        desc:"A user adds a product into their shopping cart." },
      { value:"checkout",
        tier:1,
        desc:"A user checkouts with a set of products." },
      { value:"remove_from_cart",
        tier:2,
        desc:"A user removes a product from their shopping cart." },
      { value:"refund",
        tier:2,
        desc:"A user requests a refund of products they bought." },
      { value:"subscribe",
        tier:3,
        desc:"A user subscribes a product for its information." } ] },
  { title:"Consumption (content media)",
    events:[ { value:"read",
        tier:3,
        desc:"A user reads a piece of written content." },
      { value:"watch",
        tier:3,
        desc:"A user watches content that is of a video format." },
      { value:"listen",
        tier:3,
        desc:"A user listens to content that is of an audio format." },
      { value:"complete",
        tier:3,
        desc:"A user finishes consuming a product (e.g. complete a course or a video)." },
      { value:"add_to_collection",
        tier:3,
        desc:"A user adds a product to their personal collection." },
      { value:"remove_from_collection",
        tier:3,
        desc:"A user removes a product from their personal collection." } ] },
  { title:"Feedback signals",
    events:[ { value:"rate",
        tier:2,
        desc:"A user gives a rating to a product or piece of content." },
      { value:"like",
        tier:3,
        desc:"A user indicates a like for a product." },
      { value:"dislike",
        tier:3,
        desc:"A user indicates a dislike for a product." },
      { value:"share",
        tier:3,
        desc:"A user shares a product or piece of content." },
      { value:"bookmark",
        tier:3,
        desc:"A user bookmarks a product." } ] },
  { title:"Custom",
    events:[ { value:"custom",
        tier:2,
        desc:"You can keep track of any custom event defined by yourself." } ] } ];

var data$8 = [ { name:"type",
    required:true,
    type:"string",
    desc:"The type of event.\n" },
  { name:"custom_action_name",
    used_by:[ "custom" ],
    required:true,
    type:"string",
    desc:"The name of the custom interaction that you have defined.\n" },
  { name:"user_id",
    type:"string",
    desc:"Identifies the signed-in user who performed the interaction. We will use `user_id` to link Interaction records to your User records. For visitors who have not signed in, see `anonymous_id`.\n" },
  { name:"anonymous_id",
    type:"string",
    desc:"A pseudo-unique substitute for `user_id`. We use `anonymous_id` to identify a visitor who has not signed in. When a visitor signs in and the `user_id` and `anonymous_id` are both present, the `anonymous_id` will be linked to the `user_id` along with the past interactions associated with it.\n" },
  { name:"category",
    used_by:[ "category_page_view" ],
    type:"array of strings",
    desc:"A hierarchical list describing the product category. For example, `['home', 'kitchen', 'tools']`.\n" },
  { name:"search",
    used_by:[ "search" ],
    type:"object",
    desc:"The search keywords and filters the user uses.\n" },
  { name:"revenue",
    used_by:[ "checkout" ],
    type:"object",
    desc:"Total revenue associated with the checkout. The revenue should include generally shipping, tax, etc. that you want to include as part of your revenue calculations.\n" },
  { name:"quantities",
    used_by:[ "add_to_cart",
      "checkout" ],
    type:"array of positive integers",
    desc:"The quantities of products the user adds to their cart or checks out with.\n" },
  { name:"rating",
    used_by:[ "rate" ],
    type:"number",
    desc:"The rating the user gave in the range of [0, 5]. As a convention in the RecSys community, a rating >= 3.5 is considered positive, a rating <= 2 is negative, and otherwise a rating is neutral. If you use any other rating scale, please normalize it to a [0, 5] scale.\n" },
  { name:"duration",
    used_by:[ "product_detail_page_view",
      "category_page_view",
      "home_page_view",
      "promo_page_view",
      "read",
      "watch",
      "listen" ],
    type:"number",
    desc:"How long (in seconds) the user stayed on this page, or consumed (listened, read, or watched) a product.\n" },
  { name:"product_ids",
    used_by_except:[ "search",
      "home_page_view" ],
    type:"array of strings",
    desc:"Products or content the user is interacting with. Default: `[]`\n" },
  { name:"product_group_ids",
    used_by_except:[ "search",
      "home_page_view" ],
    type:"array of strings",
    desc:"The product groups the user is interacting with.\n" },
  { name:"timestamp",
    type:"string",
    desc:"The ISO-8601 timestamp specifying when the interaction occurred. If the interaction just happened, leave it out and we will default to the server's time.\n" },
  { name:"miso_id",
    type:"string",
    desc:"Miso-generated unique Id for each recommendation or search result.\n" },
  { name:"context",
    type:"object",
    desc:"An object of extra information that provides useful context about an interaction.\n" } ];

const props$2 = Object.freeze(data$8);

function getEventProps(name) {
  return props$2.filter((prop) => 
    (!prop.used_by && !prop.used_by_except) ||
    (prop.used_by && prop.used_by.includes(name)) ||
    (prop.used_by_except && !prop.used_by_except.includes(name))
  );
}

const groups$2 = Object.freeze(data$9.map(group => Object.freeze({
  ...group,
  events: group.events.map(event => Object.freeze({
    ...event,
    props: getEventProps(event.name)
  })),
})));

var index$3 = Object.freeze({ props: props$2, groups: groups$2 });

function isMixin(key) {
  return key && key.charCodeAt(0) === 95; // '_'
}

function buildPropMap(props) {
  const map = new Map();
  for (const prop of props) {
    map.set(prop.key, { name: prop.key, ...prop });
  }
  return map;
}

function buildMixinGroupMap(groups) {
  const map = new Map();
  for (const group of groups) {
    if (isMixin(group.key)) {
      map.set(group.key, group);
    }
  }
  return map;
}

function unfoldProps(propMap, mixinGroupMap, keys, arr = []) {
  for (const key of keys) {
    if (isMixin(key)) {
      unfoldProps(propMap, mixinGroupMap, mixinGroupMap.get(key).props, arr);
    } else {
      arr.push(propMap.get(key));
    }
  }
  return arr;
}

function expand(groups, props) {
  const propMap = buildPropMap(props);
  const mixinGroupMap = buildMixinGroupMap(groups);

  return Object.freeze(groups.reduce((m, group) => {
    if (!isMixin(group.key)) {
      const keys = group.keys || [group.key];
      const props = unfoldProps(propMap, mixinGroupMap, group.props);
      for (const key of keys) {
        m[key] = { key, props };
      }
    }
    return m;
  }, {}));
}

var helpers = /*#__PURE__*/Object.freeze({
  __proto__: null,
  expand: expand
});

var data$7 = [ { key:"_config",
    props:[ "engine_id" ] },
  { key:"_product",
    props:[ "fq",
      "fl",
      "type" ] },
  { key:"_page_0",
    props:[ "start_0",
      "rows" ] },
  { key:"_page_1",
    props:[ "pagination_id",
      "start_1",
      "rows" ] },
  { key:"_page_2",
    props:[ "start_0",
      "total" ] },
  { key:"_event.product",
    props:[ "event.product_ids",
      "event.product_group_ids" ] },
  { key:"_event.context",
    props:[ "event.timestamp",
      "miso_id",
      "event.context" ] },
  { key:"search.payload",
    props:[ "_config",
      "q_0",
      "_product",
      "_page_0" ] },
  { key:"autocomplete.payload",
    props:[ "_config",
      "q_1",
      "_product",
      "_page_0" ] },
  { key:"user_to_products.payload",
    props:[ "_config",
      "_product",
      "_page_1" ] },
  { key:"user_to_attributes.payload",
    props:[ "_config",
      "field",
      "_product",
      "_page_1" ] },
  { key:"user_to_trending.payload",
    props:[ "_config",
      "_product",
      "_page_1" ] },
  { key:"product_to_products.payload",
    props:[ "_config",
      "product_id",
      "product_ids",
      "product_group_id",
      "buy_together",
      "_product",
      "_page_1" ] },
  { key:"questions.payload",
    props:[ "question",
      "parent_question_id",
      "fq",
      "source_fl",
      "related_resource_fl" ] },
  { key:"related_questions.payload",
    props:[ "product_id_1" ] },
  { key:"search.response",
    props:[ "products",
      "_page_2" ] },
  { key:"autocomplete.response",
    props:[ "completions",
      "_page_2" ] },
  { key:"user_to_products.response",
    props:[ "products" ] },
  { key:"user_to_trending.response",
    props:[ "products" ] },
  { key:"user_to_attributes.response",
    props:[ "attributes" ] },
  { key:"product_to_products.response",
    props:[ "products" ] },
  { key:"questions.response",
    props:[ "answer",
      "question",
      "question_id",
      "sources",
      "related_resources",
      "followup_questions",
      "finished" ] },
  { key:"related_questions.response",
    props:[ "related_questions" ] } ];

var data$6 = [ { key:"engine_id",
    type:"string",
    desc:"The engine you want to get results from. If not specified, the default engine will be used.\n" },
  { key:"user_id",
    type:"string",
    desc:"The user who made the query and for whom Miso will personalize the results. Either `user_id` or `anonymous_id` needs to be specified.\n" },
  { key:"anonymous_id",
    type:"string",
    desc:"The anonymous visitor who made the query and for whom Miso will personalize the results. Either `user_id` or `anonymous_id` needs to be specified for personalization to work.\n" },
  { key:"user_hash",
    type:"string",
    desc:"The hash of `user_id` encrypted by your [Secret API Key](https://api.askmiso.com/#section/Authentication/Secret%20API%20Key).\n" },
  { key:"miso_id",
    type:"string",
    desc:"Miso-generated unique Id for each recommendation or search result.\n" },
  { key:"q_0",
    name:"q",
    required:true,
    type:"string",
    desc:"The search query the user has entered. Must be non-empty.\n" },
  { key:"q_1",
    name:"q",
    required:true,
    type:"string",
    desc:"The search query the user has entered. Must be non-empty.\n" },
  { key:"fq",
    type:"string",
    desc:"A query string in Solr syntax which restricts the superset of products to return, without influencing the overall ranking.\n" },
  { key:"field",
    required:true,
    type:"string",
    desc:"The attribute you want to make recommendations for.\n" },
  { key:"product_id",
    type:"string",
    desc:"The `product_id` of the anchor product to recommend against.\n" },
  { key:"product_id_1",
    name:"product_id",
    type:"string",
    desc:"The `product_id` of the article to generate questions against.\n" },
  { key:"product_ids",
    type:"array of strings",
    desc:"An array of `product_id` of the anchor products to recommend against.\n" },
  { key:"product_group_id",
    type:"string",
    desc:"The `product_group_id` of the anchor product to recommend against.\n" },
  { key:"buy_together",
    type:"boolean",
    desc:"Whether to focus on the Products that are frequently bought together.\nDefault: `false`.\n" },
  { key:"fl",
    type:"array of strings",
    "default":"[]",
    desc:"List of fields to retrieve. The field `product_id` is always included.\nWhen not specified, only `product_id` will be retrieved. \nYou can retrieve all fields with `[\"*\"]`. Default: `[\"*\"]`.\n" },
  { key:"type",
    type:"string",
    desc:"Specify the type of product to return.\n" },
  { key:"question",
    type:"string",
    desc:"The question.\n" },
  { key:"parent_question_id",
    type:"string",
    desc:"The ID of the previous question. Make this query a follow-up question by specifying this ID.\n" },
  { key:"question_id",
    type:"string",
    desc:"The question ID which be can used to retrieve answer updates.\n" },
  { key:"source_fl",
    type:"array of strings",
    desc:"A list of fields to be returned on `sources` items. The fields `product_id`, `title`, `snippet` are always included.\nDefault: `[\"cover_image\"]`.\n" },
  { key:"related_resource_fl",
    type:"array of strings",
    desc:"A list of fields to be returned on `related_resources` items. The fields `product_id`, `title`, `snippet` are always included.\nDefault: `[\"cover_image\"]`.\n" },
  { key:"start_0",
    name:"start",
    type:"integer",
    desc:"The offset of records to retrieve.\nDefault: `0`.\n" },
  { key:"start_1",
    name:"start",
    type:"integer",
    desc:"The offset of records to retrieve. You can only set it when `pagination_id` is specified.\nDefault: `0`.\n" },
  { key:"pagination_id",
    type:"string",
    desc:"A unique identifier to enable pagination in Recommendation APIs. \nTo enable pagination, you generate a `pagination_id` and set it in the first and subsequent requests in the same browsing session where you want to enable pagination.\n" },
  { key:"rows",
    type:"integer",
    desc:"Number of records to retrieve.\nDefault: `5`.\n" },
  { key:"total",
    type:"integer",
    desc:"The total number of matched records.\n" },
  { key:"products",
    type:"array of objects",
    desc:"An array of Product records. Use `fl` parameter to specify what fields are returned.\n" },
  { key:"spellcheck",
    type:"object",
    desc:"An object of spell checking information.\n" },
  { key:"completion_fields",
    type:"array of strings",
    desc:"Specify which fields of product are autocompleted against.\nDefault: `['title']`.\n" },
  { key:"completions",
    type:"object",
    desc:"An object of autocompletion information.\n" },
  { key:"attributes",
    type:"array of objects",
    desc:"An array of recommended attributes.\n" },
  { key:"answer",
    type:"string",
    desc:"The answer to the question.\n" },
  { key:"sources",
    type:"array of objects",
    desc:"An array of articles that the answer is based on.\n" },
  { key:"related_resources",
    type:"array of objects",
    desc:"An array of articles that the answer is related to.\n" },
  { key:"followup_questions",
    type:"array of strings",
    desc:"An array of sugessions for follow-up questions.\n" },
  { key:"finished",
    type:"boolean",
    desc:"Whether the answer is finished.\n" },
  { key:"related_questions",
    type:"array of strings",
    desc:"An array of questions.\n" } ];

const props$1 = Object.freeze(data$6);
const groups$1 = expand(data$7, props$1);

var index$2 = Object.freeze({
  props: props$1,
  groups: groups$1
});

var data$5 = [ { key:"products.upload.payload",
    props:[ "product_id",
      "created_at",
      "updated_at",
      "published_at",
      "type",
      "product_group_id",
      "parent_id",
      "related_ids",
      "title",
      "description_c",
      "html",
      "language",
      "categories",
      "tags",
      "url",
      "cover_image",
      "original_price",
      "sale_price",
      "margin",
      "availability",
      "size",
      "color",
      "material",
      "condition",
      "brand",
      "authors",
      "publishers",
      "collections",
      "location",
      "custom_attributes" ] },
  { key:"users.upload.payload",
    props:[ "user_id",
      "created_at",
      "updated_at",
      "name",
      "profile_image",
      "age",
      "gender",
      "city",
      "state",
      "country",
      "group_id",
      "description_u",
      "custom_attributes" ] } ];

var data$4 = [ { key:"created_at",
    type:"string",
    desc:"The created time of the item, in ISO-8601 date or datetime format.\n" },
  { key:"updated_at",
    type:"string",
    desc:"The last updated time of the item, in ISO-8601 date or datetime format.\n" },
  { key:"published_at",
    type:"string",
    desc:"The last published time of the item, in ISO-8601 date or datetime format.\n" },
  { key:"custom_attributes",
    type:"object",
    desc:"An free-schema object to keep additional information. Note that the data schema must be consistent across all records.\n" },
  { key:"product_id",
    required:true,
    type:"string",
    desc:"The unique identifier of a catalog item.\n" },
  { key:"type",
    type:"string",
    desc:"The type of catalog item. For instance, a travel agency may have hotels and flights in its catalog.\n" },
  { key:"product_group_id",
    type:"string",
    desc:"When each of your products has multiple variants (color, size, etc.), assign a `product_group_id` to the product and assign a unique `product_id` to each variant.\n" },
  { key:"parent_id",
    type:"string",
    desc:"A non-empty string referring to the `product_id` of another catalog item. The parent item does not need to exist when you upload this item.\n" },
  { key:"related_ids",
    type:"array of strings",
    desc:"A list of `product_id` or `product_group_id` of other items related to this one.\n" },
  { key:"title",
    type:"string",
    desc:"The title of the item. This property weights more than the others in a search query.\n" },
  { key:"description_c",
    name:"description",
    type:"string",
    desc:"The description of the item. Miso makes semantic understanding from this property and extract rich information to search against.\n" },
  { key:"html",
    type:"string",
    desc:"The HTML content of the item. Miso will search against this property and apply semantic understanding in a way similar to the `description` property, but with HTML tags removed. \n" },
  { key:"language",
    type:"string",
    desc:"The language in which the item's `description` was written, in the two-letter [ISO_639-1](https://en.wikipedia.org/wiki/ISO_639-1) code.\n" },
  { key:"categories",
    type:"array of array of strings",
    desc:"A double array of strings representing multiple structured categories of an item. For example, the categories of a collectible stuffed toy can be `[['Toy', 'Stuffed Animals'], ['Art', 'Collectibles']]`.\n" },
  { key:"tags",
    type:"array of strings",
    desc:"A list of tags on the item.\n" },
  { key:"url",
    type:"URL string",
    desc:"A URL to the item (product) page.\n" },
  { key:"cover_image",
    type:"URL string",
    desc:"A URL of the cover image of the item.\n" },
  { key:"original_price",
    type:"number",
    desc:"The original price of the product item.\n" },
  { key:"sale_price",
    type:"number",
    desc:"The sales price of the product item.\n" },
  { key:"margin",
    type:"number",
    desc:"The margin of the product item.\n" },
  { key:"availability",
    type:"string (enum)",
    desc:"The availability of the product, useful in search/recommendation filters. Valid values are: `IN_STOCK`, `OUT_OF_STOCK`, `PRE_ORDER`. Default: `IN_STOCK`.\n" },
  { key:"size",
    type:"string",
    desc:"The size of the product item.\n" },
  { key:"color",
    type:"string",
    desc:"The color of the product item.\n" },
  { key:"material",
    type:"string",
    desc:"The material of the product item.\n" },
  { key:"condition",
    type:"string (enum)",
    desc:"The condition of the product item. Valid values are: `NEW`, `USED`, `REFURBISHED`. Default: `NEW`.\n" },
  { key:"brand",
    type:"string",
    desc:"The brand of the product item.\n" },
  { key:"authors",
    type:"array of strings",
    desc:"The author(s) of the product/content.\n" },
  { key:"publishers",
    type:"array of strings",
    desc:"The publisher(s) of the product/content.\n" },
  { key:"collections",
    type:"array of strings",
    desc:"The collection(s) the product/content belongs to.\n" },
  { key:"location",
    type:"object",
    desc:"An object with `lat` and `lon` values. Miso support geolocation filtering and sorting when creating search and recommendation results if location information is given. \n" },
  { key:"user_id",
    required:true,
    type:"string",
    desc:"The unique identifier of a user.\n" },
  { key:"name",
    type:"string",
    desc:"The user's full name.\n" },
  { key:"profile_image",
    type:"URL string",
    desc:"A URL of the profile image of the user.\n" },
  { key:"age",
    type:"number",
    desc:"Age of the user. Miso internally converts it to year of birth.\n" },
  { key:"gender",
    type:"string",
    desc:"The user's gender.\n" },
  { key:"city",
    type:"string",
    desc:"City or zipcode the user is based in.\n" },
  { key:"state",
    type:"string",
    desc:"State the user is based in.\n" },
  { key:"country",
    type:"string",
    desc:"Country the user is based in.\n" },
  { key:"group_id",
    type:"string",
    desc:"Group or Account ID from your CRM. This is useful in B2B scenarios.\n" },
  { key:"description_u",
    name:"description",
    type:"string",
    desc:"Text description of the user. This can be the user's own bio or the internal notes about the user. If available, Miso will analyze this description to better profile a user. \n" } ];

const props = Object.freeze(data$4);
const groups = expand(data$5, props);

var index$1 = Object.freeze({
  props,
  groups
});

var data$3 = { options:{ features:[ { key:"relatedResources",
        "default":true,
        desc:"Whether to show related resources section.\n" },
      { key:"followUpQuestions",
        "default":true,
        desc:"Whether to enable follow-up questions.\n" },
      { key:"querySuggestions",
        "default":true,
        desc:"Whether to show query suggestions for follow-up questions.\n" } ],
    phrases:[ { key:"question",
        "default":"'You asked...'",
        desc:"The phrases preceeding users' question.\n" },
      { key:"sources",
        "default":"'My reply is based on the following'",
        desc:"The title for citation sources section.\n" },
      { key:"relatedQuestions",
        "default":"'Related questions you can explore'",
        desc:"The title for related questions section.\n" },
      { key:"relatedResources",
        "default":"'Go beyond, and learn more about this topic'",
        desc:"The title for related resources section.\n" } ] } };
data$3.options;

var data$2 = { containers:[ { name:"ask",
      main_component:"answer",
      components:[ "query",
        "feedback",
        "question",
        "answer",
        "affiliation",
        "sources",
        "related-resources",
        "query-suggestions" ] },
    { name:"explore",
      main_component:"related-questions",
      components:[ "query",
        "related-questions" ] },
    { name:"hybrid-search",
      main_component:"products",
      components:[ "query",
        "products",
        "feedback",
        "question",
        "answer",
        "sources" ] },
    { name:"search",
      main_component:"products",
      components:[ "query",
        "products" ] },
    { name:"recommendation",
      main_component:"products",
      components:[ "products" ] } ],
  components:[ { name:"query",
      property:false,
      slug:"miso-query" },
    { name:"question" },
    { name:"answer",
      slug:"miso-answer" },
    { name:"feedback",
      property:false },
    { name:"products",
      slug:"collections" },
    { name:"sources",
      slug:"collections" },
    { name:"related-resources",
      slug:"collections" },
    { name:"query-suggestions",
      property:"followup_questions" },
    { name:"related-questions",
      slug:"collections" },
    { name:"affiliation",
      slug:"miso-affiliation",
      property:"*" } ] };

const workflows$3 = {};
const containers$1 = {};

function addWorkflow(workflow) {
  workflows$3[workflow.name] = workflow;
}

function getWorkflow(name) {
  return workflows$3[name];
}

function addContainer(container) {
  containers$1[container.name] = container;
}

function getContainer(name) {
  return containers$1[name];
}

const containerToComponents = {};
const componentToContainers = {};
const elements = {};

class Container {

  constructor({ components = [], ...args }) {
    let { name, tag, slug, url, main_component } = args;
    tag = tag || toTag(name);
    slug = slug || toSlug(name);
    url = url || toUrl(slug);
    main_component = elements[main_component];
    Object.assign(this, { ...args, tag, slug, url, main_component });
    Object.freeze(this);
    addContainer(this);
  }

  get components() {
    return (containerToComponents[this.name] || []).map(name => elements[name]);
  }

  get workflow() {
    return getWorkflow(this.name);
  }

}

class Component {
  
  constructor(args) {
    let { name, slug, tag, url, property } = args;
    tag = tag || toTag(name);
    url = url || toUrl(slug);
    property = property || property === false ? property : name.replaceAll('-', '_');
    Object.assign(this, { ...args, tag, url, property });
    Object.freeze(this);
  }

  get containers() {
    return (componentToContainers[this.name] || []).map(name => elements[name]);
  }

  get workflows() {
    return this.containers.map(container => container.workflow);
  }

}

let { containers, components } = data$2;

for (const { name: container, components } of containers) {
  (containerToComponents[container] || (containerToComponents[container] = [])).push(...components);
  for (const component of components) {
    (componentToContainers[component] || (componentToContainers[component] = [])).push(container);
  }
}

for (const component of components) {
  elements[component.name] = new Component(component);
}

for (const container of containers) {
  elements[container.name] = new Container(container);
}

function toSlug(name) {
  return `miso-${name}`;
}

function toTag(name) {
  return `<miso-${name}>`;
}

function toUrl(slug) {
  return slug ? `/elements/${slug}/` : false;
}

var elements$1 = Object.freeze(elements);

var data$1 = [ { name:"ask",
    label:"Ask",
    url:"/answers/ask/",
    chapter_url:"/answers/",
    context_name:"asks",
    api_group:"ask",
    apis:[ { api_name:"questions",
        properties:[ { name:"sources",
            in_catalog:true,
            item_term:"article" },
          { name:"related_resources",
            in_catalog:true,
            item_term:"article" } ] } ] },
  { name:"explore",
    label:"Explore",
    url:"/answers/explore/",
    chapter_url:"/answers/",
    api_group:"ask",
    apis:[ { api_name:"related_questions",
        properties:[ { name:"related_questions",
            in_catalog:false,
            item_term:"question" } ] } ] },
  { name:"hybrid-search",
    label:"Hybrid search",
    url:"/answers/hybrid-search/",
    chapter_url:"/answers/",
    api_group:"ask",
    apis:[ { api_name:"search",
        properties:[ { name:"products",
            in_catalog:true,
            item_term:"article" },
          { name:"sources",
            in_catalog:true,
            item_term:"article" } ] } ] },
  { name:"search",
    label:"Search",
    url:"/search/",
    chapter_url:"/search/",
    api_group:"search",
    apis:[ { api_name:"search",
        properties:[ { name:"products",
            in_catalog:true,
            item_term:"product" } ] } ] },
  { name:"recommendation",
    label:"Recommendation",
    url:"/recommendation/",
    chapter_url:"/recommendation/",
    context_name:"recommendations",
    api_group:"recommendation",
    apis:[ { api_name:"product_to_products",
        properties:[ { name:"products",
            in_catalog:true,
            item_term:"product" } ] },
      { api_name:"user_to_products",
        properties:[ { name:"products",
            in_catalog:true,
            item_term:"product" } ] },
      { api_name:"user_to_trending",
        properties:[ { name:"products",
            in_catalog:true,
            item_term:"product" } ] } ] } ];

var data = { workflows:[ { name:"ask",
      events:[ "request",
        "loading",
        "ready",
        "done",
        "interrupt",
        "error",
        "finally" ] },
    { name:"explore",
      events:[ "request",
        "select" ] } ],
  events:[ { name:"request",
      properties:[ "session",
        "payload" ],
      definition:"When SDK sends a request to Miso API." },
    { name:"loading",
      properties:[ "session",
        "status",
        "ongoing" ],
      definition:"When SDK has sent a request to Miso API and is waiting for the response." },
    { name:"ready",
      properties:[ "session",
        "status",
        "ongoing" ],
      definition:"When SDK starts to display the anwser." },
    { name:"done",
      properties:[ "session",
        "status",
        "ongoing" ],
      definition:"When the answer is fully populated." },
    { name:"interrupt",
      properties:[ "session",
        "status",
        "ongoing" ],
      definition:"When the current session is interrupted by a new session (usually by a new question submit)." },
    { name:"error",
      properties:[ "session",
        "status",
        "ongoing" ],
      definition:"When the session is interrupted by an error." },
    { name:"finally",
      properties:[ "session",
        "status",
        "ongoing" ],
      definition:"When the session is finished, either due to completion, interruption or error." },
    { name:"select",
      properties:[ "session" ],
      definition:"When a user selects a question." } ],
  properties:[ { name:"session" },
    { name:"payload" },
    { name:"status" },
    { name:"ongoing" } ] };
var workflows$2 = data.workflows;
var events$1 = data.events;
var properties = data.properties;

const propertyMap = properties.reduce((map, property) => {
  map[property.name] = property;
  return map;
}, {});

const eventMap = events$1.reduce((map, event) => {
  map[event.name] = {
    ...event,
    propertyNames: event.properties,
    properties: event.properties.map(name => propertyMap[name]),
  };
  return map;
}, {});

var events = Object.freeze(workflows$2.reduce((map, workflow) => {
  map[workflow.name] = workflow.events.map(name => eventMap[name]);
  return map;
}, {}));

class Workflow {

  constructor({ apis, ...args }) {
    apis = apis.map(args => ({
      ...args,
      api_name_camel_case: snakeToCamel(args.api_name),
    }));
    Object.assign(this, {
      ...args,
      apis,
    });
    Object.freeze(this);
    addWorkflow(this);
  }

  get container() {
    return getContainer(this.name);
  }

  get components() {
    return this.container.components;
  }

}

const workflows = {};

for (const workflow of data$1) {
  workflows[workflow.name] = new Workflow({
    ...workflow,
    events: events[workflow.name],
  });
}

function snakeToCamel(str) {
  return str.replace(/_([a-z])/g, g => g[1].toUpperCase());
}

var workflows$1 = Object.freeze(workflows);

var index = Object.freeze({
  ask: Object.freeze({
    combo: Object.freeze(data$3),
  }),
  elements: elements$1,
  workflows: workflows$1,
});

export { index$1 as data_api, index$3 as event, helpers, index$2 as query_api, index as ui };
