interface TelEntry {
  id: string;
  link: string[];
  published: string;
  'tel:canton': string;
  'tel:category': string;
  'tel:city': string;
  'tel:copyright': string;
  'tel:country': string;
  'tel:extra': string[];
  'tel:id': string;
  'tel:name': string;
  'tel:occupation': string;
  'tel:phone': number;
  'tel:pos': number;
  'tel:street': string;
  'tel:streetno': number;
  'tel:subname': string;
  'tel:type': string;
  'tel:zip': number;
  title: string;
  updated: string;
}

interface Feed {
  id: string;
  title: string;
  generator: string;
  updated: string;
  link: string[];
  'openSearch:totalResults': number;
  'openSearch:startIndex': number;
  'openSearch:itemsPerPage': number;
  'openSearch:Query': string;
  'openSearch:Image': string;
  entry: TelEntry[];
}

interface SearchResult {
  '?xml': string;
  feed: Feed;
}

export type { TelEntry, Feed, SearchResult };
