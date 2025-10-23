# Web3-Assign1

This repository contains code for F1 API. The assignment was to create multiple API endpoints for specific searches ranging from driver information to specific standings.

Built with
- Node.js + Express
- Supabase
- Render.com

API Endpoints:
| [/api/circuits] | Returns all the circuits. |
| [/api/circuits/ref] | Returns a specified circuit. |
| [/api/circuits/season/year] | Returns the circuits within the given season. |
| [/api/constructors] | Returns all the constructors. |
| [/api/constructors/ref] | Returns a specified constructor.|
| [/api/drivers] | Returns all the drivers.|
| [/api/drivers/ref] | Returns a specified driver.|
| [/api/drivers/search/substring] | Returns the drivers by a "search" of a surname. |
| [/api/drivers/race/raceId] | Returns the drivers specified by a raceId. |
| [/api/races/raceId] | Returns a specified race using raceId given. |
| [/api/races/season/year] | Returns the races within a provided season, that is ordered by round. |
| [/api/races/season/year/round] | Returns a specific race by a given season and specified by the round number. |
| [/api/races/circuits/ref] | Returns all the races for the provided circuit reference. |
| [/api/races/circuits/ref/season/start/end] | Returns all the races for the provided circuit, as well as the provided year range. |
| [/api/results/raceId] | Returns the race results for a specific raceId. |
| [/api/results/driver/ref] | Returns all the race results for a given driver. |
| [/api/results/drivers/ref/seasons/start/end] | Returns all the results for a given driver between the range of years given. |
| [/api/qualifying/raceId] | Returns the qualifying results for a specified race. |
| [/api/standings/drivers/raceId] | Returns the current season driver standings table for the specified raceId. |
| [/api/standings/constructors/raceId] | Returns the current season constructors standings table for the specified raceId.|