import { Injectable } from '@angular/core';

import { Thread } from './thread.model';

@Injectable()
export class ThreadsService {
  threads: Thread[] = [
    {
      content:
        'What is SaaS? Software as a Service Explained e as a Service Explained e as a Service Explained e as a Service Explained e as a Service Explained e as a Service Explained',
      img: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      authorLogo: 'https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg',
      authorName: 'Sidi dev',
      date: new Date('Jan 4 2022'),
      href: 'javascript:void(0)',
    },
    {
      content:
        'What is SaaS? Software as a Service Explained e as a Service Explained e as a Service Explained e as a Service Explained e as a Service Explained e as a Service Explained',
      img: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      authorLogo: 'https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg',
      authorName: 'Sidi dev',
      date: new Date('Jan 4 2022'),
      href: 'javascript:void(0)',
    },
    {
      content:
        'What is SaaS? Software as a Service Explained e as a Service Explained e as a Service Explained e as a Service Explained e as a Service Explained e as a Service Explained',
      authorLogo: 'https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg',
      authorName: 'Sidi dev',
      date: new Date('Jan 4 2022'),
      href: 'javascript:void(0)',
    },
  ];

  addThread(content: string) {
    this.threads.unshift({
      authorLogo: 'https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg',
      authorName: 'elalfy74',
      content,
      date: new Date(),
      href: 'dasd',
    });
  }
}
