from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import subprocess, math
ROOT=Path('/Users/mustafauslu/Desktop/Boraden')
FONTS=ROOT/'boradendesign2/public/assets'
OUT=ROOT/'.agent/human-opening'
FF='/opt/homebrew/lib/python3.14/site-packages/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1'
W,H,FPS=1280,720,24
font=lambda n: ImageFont.truetype(str(FONTS/'font-5.ttf'),n)
regular=lambda n: ImageFont.truetype(str(FONTS/'font-2.ttf'),n)
def centered(draw,text,y,f,fill):
    box=draw.textbbox((0,0),text,font=f)
    draw.text(((W-(box[2]-box[0]))/2,y),text,font=f,fill=fill)
def frame(t):
    im=Image.new('RGB',(W,H),(8,8,8));layer=Image.new('RGB',(W,H),(8,8,8));d=ImageDraw.Draw(layer)
    if t<3:
        alpha=min(t/.5,1,(3-t)/.4)
        centered(d,'Farklı bakışlar.',230,font(78),'white')
        centered(d,'Ortak değer: güven.',327,font(72),'white')
        d.line((607,465,634,465),fill='#00547c',width=3);d.line((639,465,666,465),fill='#e94d2a',width=3);d.line((671,465,698,465),fill='#259e3c',width=3)
    else:
        alpha=min((t-3)/.6,1)
        scale=2.35;x=W/2-33*scale;y=170
        paths=[([(3,27),(14,38),(37,9)],'#00547c'), ([(18,27),(29,38),(52,9)],'#e94d2a'), ([(33,27),(44,38),(63,9)],'#259e3c')]
        for pts,c in paths:d.line([(x+a*scale,y+b*scale) for a,b in pts],fill=c,width=12,joint='curve')
        centered(d,'BORADEN',302,font(84),'white')
        # The descriptor follows the brand, with a quiet centered entrance.
        subtitle=Image.new('RGBA',(W,H),(0,0,0,0));sd=ImageDraw.Draw(subtitle)
        text='BAĞIMSIZ DENETİM & DANIŞMANLIK';f=regular(23);tracking=1.4
        widths=[sd.textlength(c,font=f) for c in text]
        x=(W-sum(widths)-tracking*(len(text)-1))/2
        reveal=max(0,min(1,(t-3.85)/.65));rise=8*(1-reveal)
        for c,width in zip(text,widths):
            sd.text((x,421+rise),c,font=f,fill=(202,208,214,round(255*reveal)));x+=width+tracking
        layer.paste(subtitle,(0,0),subtitle)
    return Image.blend(im,layer,max(0,min(1,alpha)))
cmd=[FF,'-hide_banner','-loglevel','error','-y','-f','rawvideo','-pixel_format','rgb24','-video_size',f'{W}x{H}','-framerate',str(FPS),'-i','-','-an','-c:v','libx264','-crf','19','-preset','fast','-pix_fmt','yuv420p','-movflags','+faststart',str(OUT/'ending.mp4')]
p=subprocess.Popen(cmd,stdin=subprocess.PIPE)
for i in range(FPS*6):p.stdin.write(frame(i/FPS).tobytes())
p.stdin.close();assert p.wait()==0
frame(1.5).save(OUT/'slogan.jpg');frame(5).save(OUT/'logo.jpg')
print('Ending: 6 seconds, 1280x720, 24fps, no audio.')
