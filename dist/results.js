import { search } from "./Search.js";
const query = localStorage.getItem('search');
if (query !== null) {
    search(query);
}
//# sourceMappingURL=results.js.map