import { NextApiResponse, NextApiRequest } from 'next';
import { people, Person } from '../static/people';

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Person[]>
) {
  return res.status(200).json(people);
}