import { NextApiResponse, NextApiRequest } from 'next';
import { component } from '../static/component';

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<number[]>
) {
  return res.status(200).json(component);
}