import * as React from 'react';
import Tab from '@mui/material/Tab';
import logo from './assets/logo.png';
import ChubbyProperties from '../ChubbyProperties/ChubbyProperties';
import Submissions from '../Submissions/Submissions';
import Reviews from '../Reviews/Reviews';

export const CHUBBY_PROPERTIES = 'Chubby ProperTies';
export const FAT_PROPERTIES = 'Fat ProperTies';
export const CHUBBY_REVIEWS = 'Chubby Reviews';
export const SUBMISSIONS = 'Submissions';

export const tabs: string[] = [CHUBBY_PROPERTIES, FAT_PROPERTIES, CHUBBY_REVIEWS, SUBMISSIONS];
export const renderContent = (name: string, index: number) => {
       switch (name) {
           case CHUBBY_PROPERTIES:
               return (
                   <Tab key={index} label={name}  />
           )
           case FAT_PROPERTIES:
               return (
                   <Tab key={index} label={name} />
           )
           case CHUBBY_REVIEWS:
               return (
                   <Tab key={index} label={name} />
           )
           case SUBMISSIONS:
               return (
                   <Tab key={index} label={name} />
           )
         break;
       }

   }

  export const renderTabPanelChildren = (value: number) => {
      switch (value) {
          case 0:
              return (
                    <ChubbyProperties />
              )
          case 1:
              return (
                 <div>ChubbyProperties</div>
              )
          case 2:
              return (
                <Reviews />
              )
          case 3:
              return (
                  <Submissions />
              )
          break;

      }
  }