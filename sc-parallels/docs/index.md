---
toc: false
---

# Sutta Central Parallels
<br>

## Extracting Parallels

On Sutta Central GitHub, we find the folowing file __parallels.json__:

```js
parallels
```

```js echo
const parallels = fetch(
  "https://raw.githubusercontent.com/suttacentral/sc-data/main/relationship/parallels.json"
).then((response) => response.json())
```

We can extract into a simpler array, by removing the # details and the ~ (which means ?):

```js
parallelsArray
```

```js echo
const parallelsArray = parallels.map((d) =>
  d.parallels?.map((p) => p.split("#")[0].replace(/~/g, ""))
)
```

## Another Test

```js echo
const response = await fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson");
if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
const collection = await response.json();
```