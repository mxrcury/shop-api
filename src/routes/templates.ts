import express from 'express';

const templatesRouter = express.Router();

templatesRouter.get(
  '/',
  async (req: express.Request, res: express.Response) => {
    const hostLink = `${req.protocol}://${req.hostname}:6969/`;
    console.log(hostLink);
    const { title, author, links } = {
      title: 'Free API for your online shop project :)',
      author: 'Dmytro Honchar ',
      links: {
        documentation: `${hostLink}docs`,
        github: 'https://github.com/mxrcury',
        githubRepo: 'https://github.com/mxrcury/shop-api',
        linkedIn: 'https://www.linkedin.com/in/dmytro-honchar-b125a419b/',
        personalPhoto:
          'https://media.licdn.com/dms/image/D4D03AQHSeXRiylDCHw/profile-displayphoto-shrink_800_800/0/1676066821987?e=1685577600&v=beta&t=uK9STFIeb2AiwLnn6NWuo0apGy1WNVe4kHDNJDqueic',
        deployed: `https://shop-api-production-d2b7.up.railway.app/`,
      },
    };

    res.status(200).render('base', {
      title,
      author,
      links,
    });
  }
);
templatesRouter.get(
  '/docs',
  async (req: express.Request, res: express.Response) => {
    const hostLink = `${req.protocol}://${req.hostname}:6969/`;

    res.status(200).render('docs', {
      links: {
        host: hostLink,
      },
    });
  }
);

export { templatesRouter };
