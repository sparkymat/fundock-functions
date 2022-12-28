import { readAll } from "https://deno.land/std@0.170.0/streams/read_all.ts";
import formatJSON from "npm:format-json@1.0.3";

const inputBytes = await readAll(Deno.stdin);
const input = new TextDecoder().decode(inputBytes);

const parsedJSON = JSON.parse(input);

console.log(formatJSON.plain(parsedJSON));
