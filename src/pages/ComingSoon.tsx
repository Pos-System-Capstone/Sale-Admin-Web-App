import { Icon } from '@iconify/react';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Tooltip,
  Container,
  Typography,
  InputAdornment,
  OutlinedInput
} from '@mui/material';
// hooks
import useCountdown from '../hooks/useCountdown';
// components
import { MIconButton } from '../components/@material-extend';
import Page from '../components/Page';
import { ComingSoonIllustration } from '../assets';

// ----------------------------------------------------------------------

const SOCIALS = [
  {
    name: 'Facebook',
    icon: <Icon icon={facebookFill} width={24} height={24} color="#1877F2" />
  },
  {
    name: 'Instagram',
    icon: <Icon icon={instagramFilled} width={24} height={24} color="#D7336D" />
  },
  {
    name: 'Linkedin',
    icon: <Icon icon={linkedinFill} width={24} height={24} color="#006097" />
  },
  {
    name: 'Twitter',
    icon: <Icon icon={twitterFill} width={24} height={24} color="#1C9CEA" />
  }
];

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

const CountdownStyle = styled('div')({
  display: 'flex',
  justifyContent: 'center'
});

const SeparatorStyle = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  [theme.breakpoints.up('sm')]: {
    margin: theme.spacing(0, 2.5)
  }
}));

// ----------------------------------------------------------------------

export default function ComingSoon() {
  const countdown = useCountdown(new Date('07/07/2022 21:30'));

  return (
    <RootStyle title="Điều Khoản Dịch Vụ">
      <Container>
        <Box sx={{ margin: 'auto', textAlign: 'left' }}>
          <Typography align="center" variant="h6" paragraph>
            Điều khoản sử dụng của ứng dụng Deer Coffee. Ứng dụng đặt đồ và giao đồ ăn và thức uống
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Chào mừng bạn đến với ứng dụng Deer Coffee. Ứng dụng đặt đồ ăn và tích điểm thành viên
            Deer Coffee (gọi tắt là "ứng dụng"). Đây là một ứng dụng do Công ty TNHH Deer Coffee
            phát triển và quản lý, nhằm cung cấp cho thành viên Deer Coffee một giải pháp tiện lợi
            và nhanh chóng để đặt đồ ăn và hàng hoá từ Deer Coffee. Khi bạn sử dụng ứng dụng, bạn
            đồng ý tuân thủ các điều khoản sử dụng sau đây: <br /> - Bạn phải cung cấp thông tin
            chính xác và đầy đủ về tên, số điện thoại, địa chỉ giao hàng và phương thức thanh toán
            khi đăng ký tài khoản và đặt hàng trên ứng dụng. - Bạn không được sử dụng ứng dụng cho
            bất kỳ mục đích bất hợp pháp, vi phạm quyền của bên thứ ba, gây rối loạn trật tự công
            cộng hoặc làm tổn hại đến uy tín của Công ty TNHH Deer Coffee hoặc các nhà cung cấp trên
            ứng dụng. <br /> - Bạn chịu trách nhiệm về việc bảo mật tài khoản và mật khẩu của mình,
            và không được chia sẻ hoặc cho phép người khác sử dụng tài khoản của mình. Bạn phải
            thông báo ngay cho Công ty TNHH Deer Coffee nếu phát hiện bất kỳ hành vi xâm nhập, lạm
            dụng hoặc vi phạm an ninh của tài khoản của mình. <br /> - Bạn phải thanh toán đầy đủ và
            kịp thời cho các đơn hàng mà bạn đã đặt trên ứng dụng, theo giá và phí đã được niêm yết
            trên ứng dụng. Bạn có thể chọn thanh toán bằng tiền mặt, thẻ tín dụng, thẻ ghi nợ hoặc
            ví điện tử khi đặt hàng. Bạn không được hủy đơn hàng sau khi đã xác nhận hoặc khi hàng
            đã được giao cho nhân viên vận chuyển.
            <br /> - Bạn có quyền yêu cầu hoàn trả hoặc đổi trả hàng nếu hàng bị hư hỏng, sai sót
            hoặc không đúng với mô tả trên ứng dụng. Bạn phải liên hệ với Công ty TNHH VHGP hoặc nhà
            cung cấp trong vòng 24 giờ kể từ khi nhận hàng để được hỗ trợ. Bạn phải giữ nguyên tình
            trạng và bao bì của hàng khi yêu cầu hoàn trả hoặc đổi trả.
            <br /> - Công ty TNHH Deer Coffee có quyền thay đổi, cập nhật hoặc ngừng cung cấp ứng
            dụng bất kỳ lúc nào mà không cần thông báo trước. Công ty TNHH Deer Coffee không chịu
            trách nhiệm về bất kỳ thiệt hại nào do việc thay đổi, cập nhật hoặc ngừng cung cấp ứng
            dụng gây ra cho bạn hoặc bên thứ ba.
            <br /> - Công ty TNHH Deer Coffee có quyền đình chỉ hoặc xóa tài khoản của bạn nếu bạn
            vi phạm bất kỳ điều khoản sử dụng nào của ứng dụng. Công ty TNHH Deer Coffee cũng có
            quyền từ chối cung cấp ứng dụng cho bạn nếu bạn có hành vi gian lận, lừa đảo hoặc làm
            tổn hại đến uy tín của Công ty TNHH Deer Coffee hoặc các nhà cung cấp trên ứng dụng.
            <br /> - Khi sử dụng Ứng dụng, Khách hàng sẽ được tích lũy điểm thưởng dựa trên giá trị
            đơn hàng. Công ty sẽ quy định tỷ lệ quy đổi giữa giá trị đơn hàng và điểm thưởng và có
            thể thay đổi tỷ lệ này bất cứ lúc nào mà không cần thông báo trước. Công ty sẽ hiển thị
            số điểm thưởng của Khách hàng trên Ứng dụng.
            <br /> - Điểm thưởng của Khách hàng sẽ có giá trị trong vòng 12 tháng kể từ ngày tích
            lũy. Nếu Khách hàng không sử dụng điểm thưởng trong thời hạn này, điểm thưởng sẽ bị hết
            hạn và không được hoàn lại. Công ty có quyền thu hồi hoặc hủy bỏ điểm thưởng của Khách
            hàng nếu Khách hàng vi phạm Điều khoản, hoặc có hành vi gian lận, lừa đảo, xâm phạm
            quyền lợi của Công ty hoặc bất kỳ bên thứ ba nào.
            <br /> - Khách hàng có thể sử dụng điểm thưởng để đổi lấy các sản phẩm, dịch vụ hoặc ưu
            đãi của Công ty hoặc các đối tác liên kết của Công ty. Công ty sẽ quy định các điều kiện
            và hạn mức đổi điểm thưởng và có thể thay đổi chúng bất cứ lúc nào mà không cần thông
            báo trước. Công ty sẽ hiển thị các sản phẩm, dịch vụ hoặc ưu đãi có thể đổi điểm thưởng
            trên Ứng dụng.
            <br /> Cảm ơn bạn đã sử dụng ứng dụng Deer Coffee - Ứng dụng đặt đồ ăn Deer Coffee. Chúc
            bạn có những trải nghiệm tuyệt vời với ứng dụng!
          </Typography>

          <ComingSoonIllustration sx={{ my: 10, height: 240 }} />

          <CountdownStyle>
            <div>
              <Typography variant="h2">{countdown.days}</Typography>
              <Typography sx={{ color: 'text.secondary' }}>Days</Typography>
            </div>

            <SeparatorStyle variant="h2">:</SeparatorStyle>

            <div>
              <Typography variant="h2">{countdown.hours}</Typography>
              <Typography sx={{ color: 'text.secondary' }}>Hours</Typography>
            </div>

            <SeparatorStyle variant="h2">:</SeparatorStyle>

            <div>
              <Typography variant="h2">{countdown.minutes}</Typography>
              <Typography sx={{ color: 'text.secondary' }}>Minutes</Typography>
            </div>

            <SeparatorStyle variant="h2">:</SeparatorStyle>

            <div>
              <Typography variant="h2">{countdown.seconds}</Typography>
              <Typography sx={{ color: 'text.secondary' }}>Seconds</Typography>
            </div>
          </CountdownStyle>

          <OutlinedInput
            fullWidth
            placeholder="Enter your email"
            endAdornment={
              <InputAdornment position="end">
                <Button variant="contained" size="large">
                  Notify Me
                </Button>
              </InputAdornment>
            }
            sx={{
              my: 5,
              pr: 0.5,
              transition: (theme) =>
                theme.transitions.create('box-shadow', {
                  easing: theme.transitions.easing.easeInOut,
                  duration: theme.transitions.duration.shorter
                }),
              '&.Mui-focused': {
                boxShadow: (theme) => theme.customShadows.z8
              },
              '& fieldset': {
                borderWidth: `1px !important`,
                borderColor: (theme) => `${theme.palette.grey[500_32]} !important`
              }
            }}
          />

          <Box sx={{ textAlign: 'center', '& > *': { mx: 1 } }}>
            {SOCIALS.map((social) => (
              <Tooltip key={social.name} title={social.name}>
                <MIconButton>{social.icon}</MIconButton>
              </Tooltip>
            ))}
          </Box>
        </Box>
      </Container>
    </RootStyle>
  );
}
