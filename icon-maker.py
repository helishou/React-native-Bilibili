'''
Author       : helishou
Date         : 2021-04-19 09:27:57
LastEditTime : 2021-06-08 09:25:10
LastEditors  : helishou
Description  : 做图标用
FilePath     : \icon-maker.py
你用你的指尖,阻止我说再见,在bug完全失去之前
'''

#coding=utf-8
import tkinter as tk
import threading
import tkinter.messagebox as tkMB
import tkinter.filedialog as tkFD
import os
from PIL import Image


class Application(tk.Frame):
    def __init__(self, master=None):
        super().__init__(master)

        self.pack()
        self.create_widgets()
    def create_widgets(self):
        self.L = tk.Label(self,text="选择图像", fg="black", bg="white")
        self.L.pack()

        self.BtnRun = tk.Button(self,width=15, height=5,text = "Run",command = self.__Run)
        self.BtnRun.pack(padx=20, side='left')
    def __Run(self):
        self.filePathName = tkFD.askopenfilename(filetypes=[('图像', '.png')])
        if('' == self.filePathName): return

        self.L['text'] = self.filePathName

        _thread = threading.Thread(target=self.__thrRun)
        _thread.setDaemon(True)
        _thread.start()
    def __thrRun(self):
        path = os.path.splitext(self.filePathName)
        retpath = path[0]
        if(not os.path.exists(retpath)):
            os.mkdir(retpath)

        self.__Save(retpath, "mipmap-hdpi", 72)
        self.__Save(retpath, "mipmap-mdpi", 48)
        self.__Save(retpath, "mipmap-xhdpi", 96)
        self.__Save(retpath, "mipmap-xxhdpi", 144)
        self.__Save(retpath,"mipmap-xxxhdpi",192)

        tkMB.showinfo("提示", "处理完成")
        self.BtnRun['state'] = tk.NORMAL
    def __Save(self,retpath,dirName,size):
        retpathName = retpath + os.sep + dirName + os.sep
        if(not os.path.exists(retpathName)):
            os.mkdir(retpathName)

        retpathName1 = retpathName + "ic_launcher.png"
        retpathName2 = retpathName + "ic_launcher_round.png"
        im = Image.open(self.filePathName)
        out = im.resize((size, size), Image.ANTIALIAS)
        out.save(retpathName1)
        out.save(retpathName2)


root = tk.Tk()
root.title('title')
root.geometry('400x200')
root.maxsize(400, 200)
root.minsize(400, 200)
app = Application(master=root)
app.mainloop()
# ————————————————
# 版权声明：本文为CSDN博主「jiyanglin」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
# 原文链接：https://blog.csdn.net/jiyanglin/article/details/81877869