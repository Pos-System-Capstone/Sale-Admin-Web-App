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

export default function PassioPolicy() {
  const countdown = useCountdown(new Date('07/07/2022 21:30'));

  return (
    <RootStyle title="Điều Khoản Dịch Vụ">
      <Container>
        <Box sx={{ margin: 'auto', textAlign: 'left' }}>
          <Typography align="center" variant="h6" paragraph>
            Điều khoản sử dụng của ứng dụng Passio Coffee. Ứng dụng đặt đồ và giao đồ ăn và thức
            uống
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Chính sách quyền riêng tư của ứng dụng tích điểm thành viên Passio Coffee
            <br />
            Passio Coffee tôn trọng và bảo vệ quyền riêng tư của khách hàng. Chính sách quyền riêng
            tư này nhằm giải thích cách chúng tôi thu thập, sử dụng, chia sẻ và bảo vệ thông tin cá
            nhân của bạn khi bạn sử dụng ứng dụng tích điểm thành viên Passio Coffee (sau đây gọi là
            "Ứng dụng"). Bằng cách sử dụng Ứng dụng, bạn đồng ý với các điều khoản và điều kiện của
            chính sách quyền riêng tư này.
            <br />
            Thông tin cá nhân mà chúng tôi thu thập
            <br />
            Khi bạn đăng ký và sử dụng Ứng dụng, chúng tôi có thể yêu cầu bạn cung cấp một số thông
            tin cá nhân, bao gồm:
            <br />
            - Họ và tên
            <br />
            - Số điện thoại
            <br />
            - Địa chỉ email
            <br />
            - Ngày sinh
            <br />
            - Giới tính
            <br />
            - Ảnh đại diện
            <br />
            Chúng tôi cũng có thể thu thập thông tin về cách bạn sử dụng Ứng dụng, bao gồm:
            <br />
            - Lịch sử giao dịch
            <br />
            - Số điểm tích lũy
            <br />
            - Số phiếu mua hàng
            <br />
            - Sở thích và lựa chọn của bạn
            <br />
            Mục đích thu thập thông tin cá nhân
            <br />
            Chúng tôi thu thập thông tin cá nhân của bạn với các mục đích sau:
            <br />
            - Để xác minh danh tính và tài khoản của bạn
            <br />
            - Để cung cấp cho bạn các tính năng và dịch vụ của Ứng dụng
            <br />
            - Để nâng cao chất lượng và trải nghiệm của bạn khi sử dụng Ứng dụng
            <br />
            - Để gửi cho bạn các thông báo, tin tức, khuyến mãi và ưu đãi liên quan đến Ứng dụng và
            Passio Coffee
            <br />
            - Để phân tích hành vi và xu hướng của người dùng để cải thiện Ứng dụng và sản phẩm của
            Passio Coffee
            <br />
            - Để tuân thủ các quy định pháp luật có liên quan
            <br />
            Cách chúng tôi chia sẻ thông tin cá nhân
            <br />
            Chúng tôi không bán, cho thuê hoặc chuyển nhượng thông tin cá nhân của bạn cho bất kỳ
            bên thứ ba nào mà không có sự đồng ý của bạn. Chúng tôi chỉ chia sẻ thông tin cá nhân
            của bạn với các bên sau:
            <br />
            - Các đối tác, nhà cung cấp hoặc nhà thầu của chúng tôi, để hỗ trợ chúng tôi trong việc
            cung cấp Ứng dụng và các dịch vụ liên quan. Các bên này phải tuân thủ các cam kết bảo
            mật tương đương hoặc cao hơn với chúng tôi.
            <br />
            - Các cơ quan nhà nước hoặc pháp luật, khi được yêu cầu theo quy định của pháp luật hoặc
            để bảo vệ quyền lợi hợp pháp của chúng tôi hoặc người khác.
            <br />
            - Các bên liên quan trong trường hợp chúng tôi tham gia vào một giao dịch kinh doanh như
            sáp nhập, mua bán hoặc thoái vốn.
            <br />
            Cách chúng tôi bảo vệ thông tin cá nhân
            <br />
            Chúng tôi sử dụng các biện pháp kỹ thuật, hành chính và vật lý hợp lý để bảo vệ thông
            tin cá nhân của bạn khỏi truy cập, sử dụng hoặc tiết lộ trái phép. Tuy nhiên, bạn cũng
            nên thực hiện các bước cần thiết để bảo vệ thông tin cá nhân của bạn, bao gồm:
            <br />
            - Không chia sẻ mật khẩu hoặc thông tin đăng nhập của bạn với bất kỳ ai
            <br />
            - Đăng xuất khỏi Ứng dụng khi không sử dụng
            <br />
            - Cập nhật Ứng dụng lên phiên bản mới nhất
            <br />
            - Sử dụng các phần mềm chống vi-rút và bảo mật trên thiết bị của bạn
            <br />
            Quyền và trách nhiệm của bạn
            <br />
            Bạn có quyền truy cập, sửa đổi, xóa hoặc yêu cầu ngừng sử dụng thông tin cá nhân của bạn
            bằng cách liên hệ với chúng tôi theo địa chỉ email hello@passiocoffee.com. Chúng tôi sẽ
            xử lý yêu cầu của bạn trong thời gian sớm nhất có thể, trừ khi việc làm đó vi phạm các
            quy định pháp luật hoặc ảnh hưởng đến quyền lợi hợp pháp của chúng tôi.
            <br />
            Bạn có trách nhiệm cung cấp thông tin cá nhân chính xác, đầy đủ và cập nhật khi sử dụng
            Ứng dụng. Bạn cũng có trách nhiệm tuân thủ các điều khoản và điều kiện sử dụng Ứng dụng
            và các quy định pháp luật có liên quan.
            <br />
            Thay đổi chính sách quyền riêng tư
            <br />
            Chúng tôi có thể thay đổi chính sách quyền riêng tư này theo thời gian để phù hợp với
            các hoạt động kinh doanh và yêu cầu pháp luật. Khi có thay đổi, chúng tôi sẽ thông báo
            cho bạn qua Ứng dụng hoặc email. Bằng cách tiếp tục sử dụng Ứng dụng sau khi có thông
            báo, bạn đồng ý với các thay đổi đó.
            <br />
            Liên hệ với chúng tôi
            <br />
            Nếu bạn có bất kỳ câu hỏi, ý kiến hoặc khiếu nại về chính sách quyền riêng tư này hoặc
            cách chúng tôi xử lý thông tin cá nhân của bạn, vui lòng liên hệ với chúng tôi theo địa
            chỉ email hello@passiocoffee.com. Chúng tôi sẽ cố gắng giải quyết mọi vấn đề một cách
            nhanh chóng và hiệu quả.
            <br />
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
