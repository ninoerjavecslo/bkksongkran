/**
 * Meetup page data: festival days and parties/events
 * Used by src/pages/meetup.astro and src/pages/api/meetup.ts
 */

export interface MeetupDay {
  id: 'apr10' | 'apr11' | 'apr12' | 'apr13' | 'apr14';
  label: string;
  sub: string;
}

export interface MeetupParty {
  id: string;
  day: 'apr10' | 'apr11' | 'apr12' | 'apr13' | 'apr14';
  name: string;
  headliner: string;
  venue: string;
  color: string;
  icon: string;
  type: 'Festival' | 'Circuit' | 'Free';
}

export const MEETUP_DAYS: MeetupDay[] = [
  { id: 'apr10', label: 'Apr 10', sub: 'Friday' },
  { id: 'apr11', label: 'Apr 11', sub: 'Saturday' },
  { id: 'apr12', label: 'Apr 12', sub: 'Sunday' },
  { id: 'apr13', label: 'Apr 13', sub: 'Monday 🔥' },
  { id: 'apr14', label: 'Apr 14', sub: 'Tuesday' },
];

export const MEETUP_PARTIES: MeetupParty[] = [
  { id: 'gcircuit-opening',  day: 'apr10', name: 'GCircuit — Opening Party: Team Alpha', headliner: 'Brian Solis, Mario Beckman', venue: 'UOB Live Hall, Emsphere',   color: '#a855f7', icon: 'nightlife',   type: 'Circuit' },

  { id: 's2o-night-1',      day: 'apr11', name: 'S2O Night 1',                      headliner: 'Alan Walker × Steve Aoki',    venue: 'S2O Land, Ratchada',        color: '#0ea5e9', icon: 'water_drop',  type: 'Festival' },
  { id: 'siam-night-1',     day: 'apr11', name: 'Siam Songkran Night 1',             headliner: 'Afrojack b2b R3HAB',          venue: 'Bravo BKK Arena, RCA',      color: '#006479', icon: 'festival',    type: 'Festival' },
  { id: 'gcircuit-pool-1',  day: 'apr11', name: 'GCircuit — Boy Pool Party: AQUA',  headliner: 'Boren, Kai',                  venue: 'Tribe Sky Beach Club, Emsphere', color: '#a855f7', icon: 'pool',   type: 'Circuit' },
  { id: 'gcircuit-main-1',  day: 'apr11', name: 'GCircuit — Main Party Vol. One: Empire Of The World', headliner: 'MisterMiss, Tomer Maizner', venue: 'UOB Live Hall, Emsphere', color: '#a855f7', icon: 'nightlife', type: 'Circuit' },
  { id: 'silom-apr11',      day: 'apr11', name: 'Silom Soi 2 & 4',                  headliner: 'Free street party',           venue: 'Silom Road',                color: '#f59e0b', icon: 'celebration', type: 'Free' },

  { id: 's2o-night-2',      day: 'apr12', name: 'S2O Night 2',                      headliner: 'Zedd',                        venue: 'S2O Land, Ratchada',        color: '#0ea5e9', icon: 'water_drop',  type: 'Festival' },
  { id: 'siam-night-2',     day: 'apr12', name: 'Siam Songkran Night 2',             headliner: 'Marshmello',                  venue: 'Bravo BKK Arena, RCA',      color: '#006479', icon: 'festival',    type: 'Festival' },
  { id: 'gcircuit-pool-2',  day: 'apr12', name: 'GCircuit — Bear Pool Party: AQUAXXL', headliner: 'Pat+, CallMeKevin',        venue: 'Tribe Sky Beach Club, Emsphere', color: '#a855f7', icon: 'pool',   type: 'Circuit' },
  { id: 'gcircuit-main-2',  day: 'apr12', name: 'GCircuit — Main Party Vol. Two: Adro Mada', headliner: 'Karsten Sollors, Fran Albuquerque', venue: 'UOB Live Hall, Emsphere', color: '#a855f7', icon: 'nightlife', type: 'Circuit' },
  { id: 'silom-apr12',      day: 'apr12', name: 'Silom Soi 2 & 4',                  headliner: 'Free street party',           venue: 'Silom Road',                color: '#f59e0b', icon: 'celebration', type: 'Free' },

  { id: 's2o-night-3',      day: 'apr13', name: 'S2O Night 3',                      headliner: 'Kygo',                        venue: 'S2O Land, Ratchada',        color: '#0ea5e9', icon: 'water_drop',  type: 'Festival' },
  { id: 'siam-night-3',     day: 'apr13', name: 'Siam Songkran Night 3',             headliner: 'Martin Garrix',               venue: 'Bravo BKK Arena, RCA',      color: '#006479', icon: 'festival',    type: 'Festival' },
  { id: 'gcircuit-closing', day: 'apr13', name: 'GCircuit — Closing Party: Kink',   headliner: 'Jair Sandoval, Alex Acosta',  venue: 'UOB Live Hall, Emsphere',   color: '#a855f7', icon: 'nightlife',   type: 'Circuit' },
  { id: 'silom-apr13',      day: 'apr13', name: 'Silom Soi 2 & 4',                  headliner: 'Peak day — FREE',             venue: 'Silom Road',                color: '#f59e0b', icon: 'celebration', type: 'Free' },
  { id: 'khao-san-apr13',   day: 'apr13', name: 'Khao San Road',                    headliner: 'Street water fight — FREE',   venue: 'Khao San Road',             color: '#ef4444', icon: 'water_drop',  type: 'Free' },

  { id: 'siam-night-4',     day: 'apr14', name: 'Siam Songkran Night 4',             headliner: 'John Summit',                 venue: 'Bravo BKK Arena, RCA',      color: '#006479', icon: 'festival',    type: 'Festival' },
  { id: 'silom-apr14',      day: 'apr14', name: 'Silom Soi 2 & 4',                  headliner: 'Free street party',           venue: 'Silom Road',                color: '#f59e0b', icon: 'celebration', type: 'Free' },
];
