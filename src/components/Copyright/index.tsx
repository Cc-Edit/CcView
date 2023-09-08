import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import styles from './Copyright.module.css';

export default function Copyright() {
  return (
    <Typography className={styles.copyright} variant='body2' color='text.secondary' align='center'>
      <Link target='_blank' underline='hover' rel='noopener noreferrer' color='inherit' href='https://beian.miit.gov.cn/'>
        京ICP备2023019680号
      </Link>&nbsp;&nbsp;
      <Link target='_blank' underline='hover' rel='noopener noreferrer' color='inherit' href='https://icons8.com/'>
        Icons by icons8
      </Link>
    </Typography>
  );
}
