import sys

file_path = "index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# The new HTML block for a single list of logos
logos_html = """
                        <!-- Coco Bambu -->
                        <div class="flex items-center justify-center cursor-default hover:scale-105 transition-transform duration-500 group">
                            <img src="assets/images/logo-parceiras/Coco_Bambu___Apps_on_Google_Pl_1777243759220.png" alt="Coco Bambu" 
                                 class="h-10 md:h-14 w-auto max-w-[140px] md:max-w-[180px] object-contain brightness-0 invert opacity-40 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100 transition-all duration-500">
                        </div>

                        <!-- Grupo Dahruj -->
                        <div class="flex items-center justify-center cursor-default hover:scale-105 transition-transform duration-500 group">
                            <img src="assets/images/logo-parceiras/ChatGPT%20Image%2026%20de%20abr.%20de%202026,%2020_06_01.png" alt="Grupo Dahruj" 
                                 class="h-10 md:h-14 w-auto max-w-[140px] md:max-w-[180px] object-contain brightness-0 invert opacity-40 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100 transition-all duration-500">
                        </div>

                        <!-- Autódromo Interlagos -->
                        <div class="flex items-center justify-center cursor-default hover:scale-105 transition-transform duration-500 group">
                            <img src="assets/images/logo-parceiras/ChatGPT%20Image%2026%20de%20abr.%20de%202026,%2020_12_29.png" alt="Autódromo Interlagos" 
                                 class="h-10 md:h-14 w-auto max-w-[140px] md:max-w-[180px] object-contain brightness-0 invert opacity-40 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100 transition-all duration-500">
                        </div>

                        <!-- Fórmula 1 -->
                        <div class="flex items-center justify-center cursor-default hover:scale-105 transition-transform duration-500 group">
                            <img src="assets/images/logo-parceiras/F1_logo_PNG1.png" alt="Fórmula 1" 
                                 class="h-10 md:h-14 w-auto max-w-[140px] md:max-w-[180px] object-contain brightness-0 invert opacity-40 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100 transition-all duration-500">
                        </div>

                        <!-- Litoral Plaza -->
                        <div class="flex items-center justify-center cursor-default hover:scale-105 transition-transform duration-500 group">
                            <img src="assets/images/logo-parceiras/logo-md.png" alt="Litoral Plaza" 
                                 class="h-10 md:h-14 w-auto max-w-[140px] md:max-w-[180px] object-contain brightness-0 invert opacity-40 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100 transition-all duration-500">
                        </div>

                        <!-- Goya Perfumaria -->
                        <div class="flex items-center justify-center cursor-default hover:scale-105 transition-transform duration-500 group">
                            <img src="assets/images/logo-parceiras/logo_goya-perfumaria_RiPplE.png" alt="Goya Perfumaria" 
                                 class="h-10 md:h-14 w-auto max-w-[140px] md:max-w-[180px] object-contain brightness-0 invert opacity-40 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100 transition-all duration-500">
                        </div>

                        <!-- Casa do Lojista -->
                        <div class="flex items-center justify-center cursor-default hover:scale-105 transition-transform duration-500 group">
                            <img src="assets/images/logo-parceiras/ChatGPT%20Image%2026%20de%20abr.%20de%202026,%2020_19_56.png" alt="Casa do Lojista" 
                                 class="h-10 md:h-14 w-auto max-w-[140px] md:max-w-[180px] object-contain brightness-0 invert opacity-40 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100 transition-all duration-500">
                        </div>

                        <!-- Vonny Cosméticos -->
                        <div class="flex items-center justify-center cursor-default hover:scale-105 transition-transform duration-500 group">
                            <img src="assets/images/logo-parceiras/ChatGPT%20Image%2026%20de%20abr.%20de%202026,%2020_29_00.png" alt="Vonny Cosméticos" 
                                 class="h-10 md:h-14 w-auto max-w-[140px] md:max-w-[180px] object-contain brightness-0 invert opacity-40 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100 transition-all duration-500">
                        </div>

                        <!-- Pontual Construtora -->
                        <div class="flex items-center justify-center cursor-default hover:scale-105 transition-transform duration-500 group">
                            <img src="assets/images/logo-parceiras/pontuall.png" alt="Pontual Construtora" 
                                 class="h-10 md:h-14 w-auto max-w-[140px] md:max-w-[180px] object-contain brightness-0 invert opacity-40 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100 transition-all duration-500">
                        </div>

                        <!-- COP 30 -->
                        <div class="flex items-center justify-center cursor-default hover:scale-105 transition-transform duration-500 group">
                            <img src="assets/images/logo-parceiras/File_COP30_Official_Logo_svg___1777244192005.png" alt="COP 30" 
                                 class="h-10 md:h-14 w-auto max-w-[140px] md:max-w-[180px] object-contain brightness-0 invert opacity-40 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100 transition-all duration-500">
                        </div>

                        <!-- GL Events -->
                        <div class="flex items-center justify-center cursor-default hover:scale-105 transition-transform duration-500 group">
                            <img src="assets/images/logo-parceiras/File_Logo_GL_events_svg___Wiki_1777245992448.png" alt="GL Events" 
                                 class="h-10 md:h-14 w-auto max-w-[140px] md:max-w-[180px] object-contain brightness-0 invert opacity-40 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100 transition-all duration-500">
                        </div>

                        <!-- Vegus Construtora -->
                        <div class="flex items-center justify-center cursor-default hover:scale-105 transition-transform duration-500 group">
                            <img src="assets/images/logo-parceiras/ChatGPT%20Image%2026%20de%20abr.%20de%202026,%2020_35_02.png" alt="Vegus Construtora" 
                                 class="h-10 md:h-14 w-auto max-w-[140px] md:max-w-[180px] object-contain brightness-0 invert opacity-40 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100 transition-all duration-500">
                        </div>"""

import re

# Find LISTA 1
pattern_list1 = re.compile(r'<!-- LISTA 1 -->\s*<div class="flex items-center gap-14 md:gap-28 pr-14 md:pr-28">.*?</div>\s*<!-- LISTA 2', re.DOTALL)
new_list1 = '<!-- LISTA 1 -->\n                    <div class="flex items-center gap-14 md:gap-28 pr-14 md:pr-28">\n' + logos_html + '\n                    </div>\n\n                    <!-- LISTA 2'

content = pattern_list1.sub(new_list1, content)

# Find LISTA 2
pattern_list2 = re.compile(r'<!-- LISTA 2 — CÓPIA EXATA PARA O LOOP INFINITO -->\s*<div class="flex items-center gap-14 md:gap-28 pr-14 md:pr-28">.*?</div>\s*</div>\s*</div>\s*</section>', re.DOTALL)
new_list2 = '<!-- LISTA 2 — CÓPIA EXATA PARA O LOOP INFINITO -->\n                    <div class="flex items-center gap-14 md:gap-28 pr-14 md:pr-28">\n' + logos_html + '\n                    </div>\n                </div>\n\n            </div>\n\n        </section>'

content = pattern_list2.sub(new_list2, content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated index.html successfully.")
